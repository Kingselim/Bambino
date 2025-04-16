import { Exercice } from './exercice.model'; // adapte le chemin si besoin

export class Coaching {
  idCoaching!: number;
  sessionDate!: string;
  description!: string;
  nameCoaching!: string;
  image!: string;
  exercices!: Exercice[]; // 👈 ajout de la relation OneToMany
}
