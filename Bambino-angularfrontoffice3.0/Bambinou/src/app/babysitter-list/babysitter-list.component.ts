import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/User'; // assure-toi que ce modèle est bien défini
import { BabysittingService } from '../service/babysitting.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Babysitting } from '../model/Babysitting';
import { ReviewService } from '../service/review.service';
import { RiskPredictionService } from '../service/risk-prediction.service';
@Component({
  selector: 'app-babysitter-list',
  templateUrl: './babysitter-list.component.html',
})
export class BabysitterListComponent implements OnInit {
  averageRatings: { [babysitterId: number]: number } = {};
  babysitters: User[] = [];
  reviewCounts: { [babysitterId: number]: number } = {};
  topRatedBabysitter: User | null = null;
   //IA
   riskLevels: { [babysitterId: number]: string } = {};
   confidenceScores: { [babysitterId: number]: number } = {};


  // idBabysitting?: number;

  constructor(private userService: UserServiceService,
    private babysittingService: BabysittingService,
    private toastr: ToastrService,
    private reviewService: ReviewService,
    private router: Router,
    private riskPredictionService: RiskPredictionService ) {}

  ngOnInit(): void {
  
      ///op3:
      // 🟢 1. Récupération des babysitters
  this.userService.getBabysitters().subscribe(data => {
    this.babysitters = data;

    // 🟢 2. Une fois les babysitters chargés, on récupère TOUS les avis
    this.reviewService.getAllReviews().subscribe(reviews => {
      const grouped: { [babysitterId: number]: number[] } = {};

      reviews.forEach(review => {
        const babysitterId = review.babysitting?.babysitter?.id;
        const rating = review.rating;

        if (babysitterId && rating != null) {
          if (!grouped[babysitterId]) {
            grouped[babysitterId] = [];
          }
          grouped[babysitterId].push(rating);
        }
      });

      // 🔢 Calcul des moyennes
      for (const id in grouped) {
        const notes = grouped[id];
        const avg = notes.reduce((a, b) => a + b, 0) / notes.length;
        this.averageRatings[+id] = Math.round(avg * 10) / 10;
        this.reviewCounts[+id] = notes.length;
      }
        // ✅ 📌 AJOUT ICI : appeler le service IA pour chaque babysitter
        this.babysitters.forEach(b => {
          this.babysittingService.getContractsByBabysitter(b.id).subscribe(contracts => {
            const nbContracts = contracts.length;
            const nbCancellations = contracts.filter(c => c.status === 'CANCELLED').length;
        
            this.reviewService.getReviewsByBabysitter(b.id).subscribe(reviews => {
              const lastComment = reviews.length > 0 ? reviews[reviews.length - 1].comment : 'Reliable and kind.';
        
              const payload = {
                avg_rating: this.averageRatings[b.id] || 0,
                nb_cancellations: nbCancellations,
                nb_contracts: nbContracts,
                comment: lastComment
              };

              console.log("📤 IA Payload:", payload);

        
              // ✅ Ajout d'une vérification côté Angular
              if (nbContracts <= 1 && this.averageRatings[b.id] >= 4.2 && this.reviewCounts[b.id] >= 1) {
                  this.riskLevels[b.id] = 'Not enough data';
              } else {
                this.riskPredictionService.predictRisk(payload).subscribe(res => {
                this.riskLevels[b.id] = res.riskLevel;
                // ✅ AJOUT ICI
                console.log("📦 Réponse complète pour", b.name, ":", res);

                
                if (res.confidence !== undefined && res.confidence !== null) {
                  this.confidenceScores[b.id] = res.confidence;}
                });
              }

            });
          });
        });

        
        

      // ✅ Trier les babysitters par moyenne décroissante
          this.babysitters.sort((a, b) => {
            const avgA = this.averageRatings[a.id] || 0;
            const avgB = this.averageRatings[b.id] || 0;
          return avgB - avgA;
});

      //🥇 Meilleur babysitter
      this.topRatedBabysitter = this.babysitters.length > 0 ? this.babysitters[0] : null;


      console.log("✅ Moyennes calculées :", this.averageRatings);
    });
  });
}
    
  // selectBabysitter(babysitterId: number): void {
  //   this.babysittingService.setSelectedBabysitter(babysitterId);
  //   console.log('✅ Babysitter sélectionné :', babysitterId);
  //   this.router.navigate(['/babysittings/new', {
  //     queryParams: { babysitterId }
  //   }]); // 👉 redirection ici
  // }
  selectBabysitter(babysitterId: number): void {
    const babyId = 3; // 👉 ici tu mets l'ID du bébé réel, dynamiquement ou en dur pour tester
    console.log('🔁 Redirection avec :', babysitterId, babyId);
    this.router.navigate(['/babysittings/new'], {
      queryParams: {
        babysitterId: babysitterId,
        babyId: babyId
      }
    });
  }
  goToReview(babysittingId: number): void {
    this.router.navigate(['/review/babysitting', babysittingId]);
  }
  createContractAndReview(babysitter: User): void {
    const babysittingToSend: Babysitting = {
      babysitter: { id: babysitter.id },
      userPatient: { id: 2 }, // 🟡 Remplace par AuthService plus tard
      startDate: new Date(),
      endDate: new Date(),
      status: 'PENDING',
      duration: 2,
      salary: 50
    };

    this.babysittingService.create(babysittingToSend).subscribe({
      next: (createdContract) => {
        this.toastr.success('Votre contrat a été enregistré.', 'Contrat créé !');

        // 🔁 Redirection vers le formulaire de feedback avec l'id du contrat
        this.router.navigate(['/review/babysitting', createdContract.idBabysitting]);
      },
      error: (err) => {
        console.error("❌ Erreur ajout :", err);
        this.toastr.error('Une erreur est survenue lors de l\'ajout du contrat.');
      }
    });
  }
  getStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  }
  
 

  
  
}
