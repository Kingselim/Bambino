import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoachingService } from 'src/app/service/coaching.service';
import { Coaching } from 'src/app/model/coaching.model';

@Component({
  selector: 'app-addcoaching',
  templateUrl: './addcoaching.component.html',
  styleUrls: ['./addcoaching.component.css']
})
export class AddCoachingComponent {
  coaching: Coaching = new Coaching();

  constructor(private coachingService: CoachingService, public router: Router) {}

  onSubmit(): void {
    this.coachingService.addCoaching(this.coaching).subscribe({
      next: () => {
        alert('✅ Coaching ajouté avec succès');
        this.router.navigate(['/coachings']);
      },
      error: () => alert('❌ Erreur lors de l\'ajout')
    });
  }
  save(): void {
    this.coachingService.addCoaching(this.coaching).subscribe({
      next: (data) => {
        alert('Coaching ajouté avec succès');
        this.router.navigate([`/coachings`]); // Rediriger vers la liste des exercices pour ce coaching
      },
      error: (err) => {
        alert('Erreur lors de l\'ajout du coaching');
        console.error(err);
      },
    });
  }
  cancel() {
    this.router.navigate([`/coachings`]); // Remplace '/coaching-list' par l'URL de ta page de liste des coachings
  }
}