package tn.esprit.bambinou.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import tn.esprit.bambinou.Entity.AuthResponse;
import tn.esprit.bambinou.Entity.LoginRequest;
import tn.esprit.bambinou.Service.EmailService;
import tn.esprit.bambinou.Service.JwtUtil;
import tn.esprit.bambinou.Service.userServiceImpl;
import tn.esprit.bambinou.Entity.User;

import java.util.Collections;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private userServiceImpl userService;  // Service qui interagit avec votre base de données pour vérifier l'email et le mot de passe

    @Autowired
    private JwtUtil jwtUtil; // Utilisation de la classe JwtUtil

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> createToken(@RequestBody LoginRequest loginRequest) {
        if (loginRequest == null) {
            throw new RuntimeException("LoginRequest est nul.");
        }
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        System.out.println("email et password  recu par le formulaire de login angular" + email + " " + password);
        if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
            throw new RuntimeException("Email ou mot de passe manquant.");
        }

        // Vérification des informations d'identification (vous pouvez ajuster cela selon votre logique de service utilisateur)
        User user = userService.retrieveUserByEmail(email);
        if (user != null && userService.checkPassword( password,user.getPassword())) {

            // Générer le token JWT
            String token = jwtUtil.generateToken(user);
            // Retourne un objet JSON contenant le token
            return ResponseEntity.ok(new AuthResponse(token));
        } else {
            //throw new RuntimeException("Email ou mot de passe incorrect.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Email ou mot de passe incorrect."));
        }
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<?> forgotPassword(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        System.out.println("email recu par le formulaire de login angular" + email);
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("Email  manquant.");
        }
        User user = userService.retrieveUserByEmail(email);
        if (user != null) {
            System.out.println("l id du user dans forgot password "+user.getId());
            // Envoyer un email de reinitialisation de mot de passe
            emailService.sendEmailWithStylizedTemplate(email, "Reinitialisation de mot de passe", user.getName(),user.getId());
            return ResponseEntity.ok().build();

        }else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Email incorrect."));
        }
    }
/*
    @PutMapping("/restorepasswodrd")
    public ResponseEntity<?> restorePassword(@RequestBody User user) {
        System.out.println("Données reçues : " + user);

        if (user.getEmail() == null || user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email ou mot de passe manquant."));
        }

        User existingUser = userService.retrieveUserByEmail(user.getEmail());
        if (existingUser != null) {
            System.out.println("Utilisateur trouvé dans la base de données");
            existingUser.setPassword(user.getPassword());
            userService.modifyUser(existingUser);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Mot de passe mis à jour avec succès."));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", "Email incorrect."));
    }
*/

    @PostMapping("/restorepassword")
    public ResponseEntity<?> restorePassword(@RequestBody LoginRequest loginRequest) {
        System.out.println("dans restore password");
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        System.out.println("email et password  recu par le formulaire de login angular" + email + " " + password);
        if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email ou mot de passe manquant."));
        }
        User existingUser = userService.retrieveUserByEmail(email);
        if (existingUser != null) {
            System.out.println("Utilisateur trouvé dans la base de données");
            existingUser.setPassword(password);
            userService.modifyUser(existingUser);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Mot de passe mis à jour avec succès."));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", "Email incorrect."));
        }


}
