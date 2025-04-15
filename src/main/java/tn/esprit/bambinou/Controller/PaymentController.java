package tn.esprit.bambinou.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tn.esprit.bambinou.DTO.AppointmentDTO;
import tn.esprit.bambinou.DTO.AppointmentResponseDTO;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Repository.DriverRepository;
import tn.esprit.bambinou.Repository.ExpertRepository;
import tn.esprit.bambinou.Repository.UserRepository;
import tn.esprit.bambinou.Service.AppointmentServiceImpl;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    private final AppointmentServiceImpl appointmentService;
    private final String clientId;
    private final String clientSecret;
    private final String mode;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpertRepository expertRepository;

    @Autowired
    private DriverRepository driverRepository;

    public PaymentController(AppointmentServiceImpl appointmentService,
                             @Value("${paypal.client-id}") String clientId,
                             @Value("${paypal.client-secret}") String clientSecret,
                             @Value("${paypal.mode}") String mode) {
        this.appointmentService = appointmentService;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.mode = mode;
    }

    /**
     * This endpoint initiates a PayPal order.
     * It expects a JSON body like:
     * {
     *    "amount": 50.00
     * }
     * and returns the PayPal order id (no appointment is created yet).
     */
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> paymentRequest) {
        try {
            if (!paymentRequest.containsKey("amount")) {
                return ResponseEntity.badRequest().body(errorResponse("Amount is required"));
            }

            float amount = Float.parseFloat(paymentRequest.get("amount").toString());
            Map<String, Object> orderRequest = buildOrderRequest(amount);
            String accessToken = getPayPalAccessToken();
            if (accessToken == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(errorResponse("Failed to authenticate with PayPal"));
            }

            ResponseEntity<Map> paypalResponse = createPayPalOrder(accessToken, orderRequest);
            if (!paypalResponse.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(errorResponse("Failed to create PayPal order"));
            }

            // Return only the PayPal order id to the client.
            return ResponseEntity.ok(successResponse(
                    paypalResponse.getBody().get("id").toString(), null));
        } catch (Exception e) {
            return handleException(e, "Error creating order");
        }
    }

    /**
     * This endpoint captures a PayPal order and creates the appointment.
     * It expects a JSON body like:
     * {
     *   "orderId": "PAYPAL_ORDER_ID_HERE",
     *   "appointment": {
     *       "location": "Clinic A",
     *       "description": "Consultation appointment",
     *       "appointmentDateTime": "2025-05-01T10:30:00",
     *       "userId": 1,
     *       "expertId": 2,
     *       "driverId": 0
     *    }
     * }
     * After successfully capturing the payment, this endpoint creates the appointment using createApp(),
     * setting paymentStatus to "done" and transactionId to the PayPal order id.
     */
    @PostMapping("/capture-order")
    public ResponseEntity<?> captureOrder(@RequestBody Map<String, Object> captureRequest) {
        try {
            if (!captureRequest.containsKey("orderId") || !captureRequest.containsKey("appointment")) {
                return ResponseEntity.badRequest().body(errorResponse("orderId and appointment details are required"));
            }
            String orderId = captureRequest.get("orderId").toString();
            Map<String, Object> appointmentMap = (Map<String, Object>) captureRequest.get("appointment");

            String accessToken = getPayPalAccessToken();
            if (accessToken == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(errorResponse("Failed to authenticate with PayPal"));
            }

            ResponseEntity<Map> paypalResponse = capturePayPalPayment(accessToken, orderId);
            if (!paypalResponse.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(errorResponse("Payment capture failed"));
            }

            // Build AppointmentDTO from the provided appointment details.
            AppointmentDTO dto = new AppointmentDTO();
            if (appointmentMap.containsKey("location"))
                dto.setLocation(appointmentMap.get("location").toString());
            if (appointmentMap.containsKey("description"))
                dto.setDescription(appointmentMap.get("description").toString());
            if (appointmentMap.containsKey("appointmentDateTime"))
                dto.setAppointmentDateTime(appointmentMap.get("appointmentDateTime").toString());
            if (appointmentMap.containsKey("userId"))
                dto.setUserId(Integer.parseInt(appointmentMap.get("userId").toString()));
            if (appointmentMap.containsKey("expertId"))
                dto.setExpertId(Integer.parseInt(appointmentMap.get("expertId").toString()));
            if (appointmentMap.containsKey("driverId")) {
                dto.setDriverId(Integer.parseInt(appointmentMap.get("driverId").toString()));
            } else {
                dto.setDriverId(0);
            }

            // Set payment fields: paymentStatus to "done" and transactionId to the PayPal order id.
            dto.setPaymentStatus("done");
            dto.setTransactionId(orderId);

            // Create the appointment via your createApp() method.
            ResponseEntity<AppointmentResponseDTO> createResponse = appointmentService.createApp(dto);
            if (createResponse.getBody() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(errorResponse("Failed to create appointment after payment capture"));
            }

            Appointment appointment = convertResponseToEntity(createResponse.getBody());
            return ResponseEntity.ok(successResponse(appointment));
        } catch (Exception e) {
            return handleException(e, "Error capturing order");
        }
    }

    // Utility methods for PayPal integration and response formatting

    private Map<String, Object> buildOrderRequest(float amount) {
        Map<String, Object> orderRequest = new HashMap<>();
        orderRequest.put("intent", "CAPTURE");

        Map<String, Object> purchaseUnit = new HashMap<>();
        purchaseUnit.put("amount", Map.of(
                "currency_code", "USD",
                "value", amount
        ));
        orderRequest.put("purchase_units", new Map[]{purchaseUnit});

        if ("sandbox".equals(mode)) {
            orderRequest.put("application_context", Map.of(
                    "user_action", "PAY_NOW",
                    "payment_method", Map.of(
                            "payer_selected", "PAYPAL",
                            "payee_preferred", "IMMEDIATE_PAYMENT_REQUIRED"
                    )
            ));
        }
        return orderRequest;
    }

    private ResponseEntity<Map> createPayPalOrder(String accessToken, Map<String, Object> orderRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(orderRequest, headers);
        return new RestTemplate().postForEntity(
                getPayPalBaseUrl() + "/v2/checkout/orders",
                request,
                Map.class
        );
    }

    private ResponseEntity<Map> capturePayPalPayment(String accessToken, String orderId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>(headers);
        return new RestTemplate().postForEntity(
                getPayPalBaseUrl() + "/v2/checkout/orders/" + orderId + "/capture",
                request,
                Map.class
        );
    }

    private String getPayPalAccessToken() {
        try {
            String auth = clientId + ":" + clientSecret;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Basic " + encodedAuth);
            headers.set("Content-Type", "application/x-www-form-urlencoded");

            HttpEntity<String> request = new HttpEntity<>("grant_type=client_credentials", headers);
            ResponseEntity<Map> response = new RestTemplate().postForEntity(
                    getPayPalBaseUrl() + "/v1/oauth2/token",
                    request,
                    Map.class
            );
            return (String) response.getBody().get("access_token");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String getPayPalBaseUrl() {
        return "sandbox".equals(mode)
                ? "https://api-m.sandbox.paypal.com"
                : "https://api-m.paypal.com";
    }

    private Map<String, Object> errorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("error", message);
        return response;
    }

    private Map<String, Object> successResponse(String orderId, Long appointmentId) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("orderId", orderId);
        if(appointmentId != null) {
            response.put("appointmentId", appointmentId);
        }
        return response;
    }

    private Map<String, Object> successResponse(Appointment appointment) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("appointment", appointment);
        return response;
    }

    private ResponseEntity<?> handleException(Exception e, String context) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorResponse(context + ": " + e.getMessage()));
    }

    // Conversion methods between DTOs and entity objects (adjust as needed)
    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setLocation(appointment.getLocation());
        dto.setStatus(appointment.getStatus());
        dto.setDescription(appointment.getDescription());
        dto.setAppointmentDateTime(appointment.getAppointmentDateTime());
        dto.setUserId(appointment.getUser().getId());
        dto.setExpertId(appointment.getExpert().getId());
        dto.setDriverId(appointment.getDriver() != null ? appointment.getDriver().getId() : 0);
        // Assume that paymentStatus and transactionId are also part of AppointmentDTO.
        dto.setPaymentStatus(appointment.getPaymentStatus());
        dto.setTransactionId(appointment.getTransactionId());
        return dto;
    }

    private Appointment convertResponseToEntity(AppointmentResponseDTO response) {
        Appointment appointment = new Appointment();
        appointment.setIdAppointment(response.getIdAppointment());
        appointment.setLocation(response.getLocation());
        appointment.setStatus(response.getStatus());
        appointment.setDescription(response.getDescription());
        appointment.setAppointmentDateTime(response.getAppointmentDateTime());

        if (response.getUser().getId() != 0) {
            userRepository.findById(response.getUser().getId()).ifPresent(appointment::setUser);
        }

        if (response.getExpert().getId() != 0) {
            expertRepository.findById(response.getExpert().getId()).ifPresent(appointment::setExpert);
        }

        if (response.getDriver().getIdDriver() != 0) {
            driverRepository.findById(response.getDriver().getIdDriver()).ifPresent(appointment::setDriver);
        }

        return appointment;
    }
}
