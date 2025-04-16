import { Component } from '@angular/core';
import { ExerciceService } from 'src/app/service/exercice.service';
import { Exercice } from 'src/app/model/exercice.model';

@Component({
  selector: 'app-exercice-form',
  templateUrl: './exercice-form.component.html',
  styleUrls: ['./exercice-form.component.css'],
})
export class ExerciceFormComponent {
  exercice: Exercice = new Exercice();
  showModal: boolean = false; // Cette variable contrôle l'affichage de la modale

  constructor(private exerciceService: ExerciceService) {}

  openModal(): void {
    this.showModal = true; // Ouvre la modale
  }

  closeModal(): void {
    this.showModal = false; // Ferme la modale
  }

  save(): void {
    this.exerciceService.addExercice(this.exercice).subscribe(() => {
      alert('Exercice ajouté!');
      this.closeModal(); // Ferme la modale après l'ajout
    });
  }
}
