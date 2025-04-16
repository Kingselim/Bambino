import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from 'src/app/service/exercice.service';
import { Exercice } from 'src/app/model/exercice.model';

@Component({
  selector: 'app-ajouter-exercice',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  exercice: Exercice = new Exercice();
  coachingId!: number;

  difficulties = ['Easy', 'Medium', 'Hard'];

  constructor(
    private exerciceService: ExerciceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.coachingId = +idParam;
      }
    });
  }

  save(): void {
    this.exercice.coaching = { idCoaching: this.coachingId } as any;  // Associer le coaching

    // Appel au service pour ajouter l'exercice
    this.exerciceService.addExercice(this.exercice).subscribe({
      next: (data) => {
        alert('Exercice ajouté avec succès');
        this.router.navigate([`/coaching/${this.coachingId}/exercices`]); // Rediriger vers la liste des exercices
      },
      error: (err) => {
        alert('Erreur lors de l\'ajout de l\'exercice');
        console.error(err);
      },
    });
  }
}
