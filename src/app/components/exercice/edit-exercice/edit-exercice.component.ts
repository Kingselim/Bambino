import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from 'src/app/service/exercice.service';
import { Difficulty, Exercice } from 'src/app/model/exercice.model';

@Component({
  selector: 'app-edit-exercice',
  templateUrl: './edit-exercice.component.html',
  styleUrls: ['./edit-exercice.component.css']
})
export class EditExerciceComponent implements OnInit {

  exercice: Exercice = {
    idExercice: 0,
    name: '',
    duration: 0,
    videoUrl: '',
    imageUrl: '',
    category: '',
    difficulty: Difficulty.EASY,
    description: '',
    coaching: { idCoaching: 0 }
  };

  difficulties = Object.values(Difficulty); // Pour <select> dynamique si besoin

  constructor(
    private exerciceService: ExerciceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.exerciceService.getExercice(id).subscribe({
        next: (data) => {
          this.exercice = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l\'exercice :', err);
        }
      });
    } else {
      console.warn('ID d\'exercice non valide');
      this.router.navigate(['/exercices']);
    }
  }

  onUpdate(): void {
    this.exerciceService.updateExercice(this.exercice.idExercice, this.exercice).subscribe({
      next: (updatedExercice) => {
        console.log('✅ Exercice mis à jour avec succès !');
        this.router.navigate(['/exercices']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la mise à jour :', err);
      }
    });
  }
}
