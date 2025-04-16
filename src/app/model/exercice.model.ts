import { Coaching } from './coaching.model';
export enum Difficulty {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard'
  }
  
  export class Exercice {
    idExercice!: number;
  name!: string;                // Nouveau champ : nom de l'exercice
  duration!: number;            // Nouveau champ : durée en minutes
  videoUrl!: string;            // Nouveau champ : URL de la vidéo
  imageUrl!: string;            // Nouveau champ : URL de l'image
  category!: string;            // Nouveau champ : catégorie de l'exercice
  difficulty!: Difficulty;      // Difficulté (enum)
  description!: string;
    coaching!: { idCoaching: number };

  }
  