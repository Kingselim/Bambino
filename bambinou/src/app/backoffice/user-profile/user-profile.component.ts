import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css',"../../../assets/BackOffice/assets/css/bootstrap.min.css",
    "../../../assets/BackOffice/assets/css/demo.css",
    "../../../assets/BackOffice/assets/css/fonts.css",
    "../../../assets/BackOffice/assets/css/fonts.min.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class UserProfileComponent {
 CurrentEmail! : string;
  CurrentName! : string;

  constructor(private authService: AuthService,private rt:Router) { }
  ngOnInit() {
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      if (decodedToken) {
        this.CurrentEmail = decodedToken.sub;
        this.CurrentName = decodedToken.name;
        console.log(this.CurrentEmail);
      }
    }
  }
}
