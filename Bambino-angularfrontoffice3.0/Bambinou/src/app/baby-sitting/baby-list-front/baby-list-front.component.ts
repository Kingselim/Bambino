import { Component, OnInit } from '@angular/core';
import { Baby } from 'src/app/model/baby';
import { BabyService } from 'src/app/service/baby.service';
import { AuthService } from 'src/app/service/auth.service'; // Si AuthService est disponible

@Component({
  selector: 'app-baby-list-front',
  templateUrl: './baby-list-front.component.html',
  styleUrls: ['./baby-list-front.component.css']
})
export class BabyListFrontComponent implements OnInit {

  babies: Baby[] = [];
  userId: number = 4; // à remplacer par AuthService.getCurrentUser().id si disponible

  constructor(private babyService: BabyService, private authService: AuthService) {}

  ngOnInit(): void {
    // this.userId = this.authService.getCurrentUser().id;
    this.babyService.getBabiesByParent(this.userId).subscribe({
      next: (data) => this.babies = data,
      error: (err) => console.error('Erreur chargement bébés:', err)
    });
  }
}
