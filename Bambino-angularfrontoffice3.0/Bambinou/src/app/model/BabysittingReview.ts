export interface BabysittingReview {
    reviewerName?: string;
    idReview?: number;        // optionnel si géré par le backend
    name: string;             // nom du parent qui laisse l'avis
    rating: number | null;           // de 1 à 5
    comment: string;          // commentaire écrit
    dateCreated?: Date;       // optionnel, si tu veux afficher la date
  
    // Liens avec le babysitter ou le contrat
    babysittingId?: number;   // pour lier l'avis à un contrat de babysitting si besoin
    babysitterId?: number;    // pour affichage ciblé
    
}
  