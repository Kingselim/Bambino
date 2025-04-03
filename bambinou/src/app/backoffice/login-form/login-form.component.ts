import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email = '';
  password = '';
  errorMessage: string = '';

  loginform: FormGroup;
  decodedToken! : object;  

  constructor(private authService: AuthService, private router: Router) {
    this.loginform = new FormGroup({

      email: new FormControl('', [Validators.required]),// controle de saisie
      password: new FormControl('', [Validators.required]),
      remember: new FormControl('')
    });
  }

  login(): void {
    this.errorMessage = ''; // Réinitialiser l'erreur avant chaque tentative
    if(this.loginform.value.remember==true){
      console.log('je suis dans le if de remember me');

      localStorage.setItem('email', this.loginform.value.email);
      localStorage.setItem('password', this.loginform.value.password);
      console.log('voici l email'+localStorage.getItem('email'));
      console.log('voici le password'+localStorage.getItem('password'));
    }
    this.authService.login(this.loginform.value.email, this.loginform.value.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          const decodedToken= this.authService.getUserInfo(); // recuperer les infos du user a partir du token
          console.log(decodedToken);

          if (decodedToken.status == 1){ // verification du status du user , si 1 ok si 0 compte bloque
            const userRole = decodedToken?.role?.[0]?.role;
            if(userRole==='ADMIN' || userRole === 'PATIENT'){
              this.router.navigate(['/backoffice/dashboard']);
            }
          }
          if (decodedToken.status == 2){
            this.errorMessage = 'Your account is being analyzed';
          }
          else
          {
            this.errorMessage = 'Your account is blocked';
          }

        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Incorrect email or password.';
        } else {
          this.errorMessage = 'An error has occurred. Please try again.';
        }
      },
      complete: () => {
        console.log('Connexion terminée');
      }
    });
  }

  ngOnInit(): void {
    // Vérifier si le token est expiré si oui deconnecter pour retirer le token du localstorage
    if(this.authService.isTokenExpored()){
      this.authService.logout();
      console.log('token expiré donc a ete retirer de localstorage');
    }
    if(localStorage.getItem('email')!==null && localStorage.getItem('password')!==null){
      this.email = localStorage.getItem('email') || '';
      this.password = localStorage.getItem('password') || '';
      this.loginform.patchValue({
       
        email: this.email,
        password: this.password
       
      })
    }
  }

 
  

}
