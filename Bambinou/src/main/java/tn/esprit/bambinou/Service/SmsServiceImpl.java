package tn.esprit.bambinou.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.stereotype.Service;
@Service

public class SmsServiceImpl implements ISmsService {
    private final String ACCOUNT_SID = "";
    private final String AUTH_TOKEN = "";
    private final String TWILIO_NUMBER = ""; // Numéro Twilio Twilio

    public SmsServiceImpl() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    @Override
    public void sendSms(String to, String content) {
        Message.creator(
                new com.twilio.type.PhoneNumber(to),
                new com.twilio.type.PhoneNumber(TWILIO_NUMBER),
                content
        ).create();
    }
}
