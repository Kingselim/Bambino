import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BabysittingService } from 'src/app/service/babysitting.service';
import { Babysitting } from 'src/app/model/Babysitting';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/service/review.service';
import { BabysittingReview } from 'src/app/model/BabysittingReview';
import { Baby } from 'src/app/model/baby';
@Component({
  selector: 'app-babysitting-form',
  templateUrl: './babysitting-form.component.html',
  styleUrls: [
    './babysitting-form.component.css'
  ]
})
export class BabysittingFormComponent implements OnInit {
  babysitting: Babysitting = {
    duration: 0,
    salary: 0,
    status: '',
    startDate: new Date(),
    endDate: new Date()
  };

  startDateInput!: string;
  endDateInput!: string;

  isEditMode = false;
  babysittingIdToShow: number = 0;

  //
  review: {
    name: string;
    rating: number | null;
    comment: string;
  } = {
    name: '',
    rating: null,
    comment: ''
  };
  reviews: BabysittingReview[] = []; // 

  constructor(
    private babysittingService: BabysittingService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    this.route.queryParams.subscribe(params => {
      const babysitterId = params['babysitterId'];
      const babyId = params['babyId'];
  
      if (babysitterId) {
        this.babysitting.babysitter = {
          id: +babysitterId,
          name: '',
          age: 0,
          email: '',
          password: '',
          roleType: 'BABYSITTER'
        };
        console.log('🟢 Babysitter ID reçu :', babysitterId);
  
        // ✅ Charger les reviews du babysitter si on crée un nouveau contrat
        // if (!id) {
        //   this.reviewService.getReviewsByBabysitterId(+babysitterId).subscribe({
        //     next: (data) => {
        //       this.reviews = data;
        //       console.log("⭐ Reviews récupérées pour babysitter :", data);
        //     },
        //     error: (err) => console.error("❌ Erreur chargement reviews babysitter :", err)
        //   });
        //}
      }
  
      if (babyId) {
        this.babysitting.babies = [
          {
            idBaby: +babyId,
            name: '',
            age: 0,
            dateOfBirth: '',
            gender: '',
            medicalCondition: '',
            specialNeeds: '',
            favoriteActivities: '',
            emergencyContact: ''
          }
        ];
        console.log('👶 Baby ID reçu :', babyId);
      }
  
      // ✅ En mode édition : on charge le contrat et ses reviews
      if (id) {
        this.isEditMode = true;
        this.babysittingService.getById(+id).subscribe({
          next: data => {
            this.babysitting = data;
            this.startDateInput = this.formatDateToInput(data.startDate);
            this.endDateInput = this.formatDateToInput(data.endDate);
            this.babysittingIdToShow = data.idBabysitting ?? 0;
            this.loadReviews(this.babysittingIdToShow);
            this.reviewService.getReviewsByBabysitting(this.babysittingIdToShow).subscribe({
              next: (data) => {
                this.reviews = data;
                console.log("⭐ Reviews récupérées pour contrat :", data);
              },
              error: (err) => console.error('❌ Erreur chargement reviews contrat :', err)
            });
          },
          error: err => console.error('❌ Erreur chargement contrat :', err)
        });
      }
    });
  }
  

  onSubmit(): void {
    console.log("🆕 onSubmit() déclenché");
  
    const babysitterId = this.babysitting.babysitter?.id;
    const babyId = this.babysitting.babies?.[0]?.idBaby;
  
    const babysittingToSend: Babysitting = {
      ...this.babysitting,
      startDate: new Date(this.startDateInput),
      endDate: new Date(this.endDateInput),
      babysitter: { id: babysitterId },
      userPatient: { id: 2 }, // plus tard on mettra AuthService
      babies: [{ idBaby: babyId } as Partial<Baby> as Baby]

    };
  
    console.log("🟡 babysittingToSend envoyé au backend :", babysittingToSend);
  
    if (this.isEditMode) {
      this.babysittingService.update(this.babysitting.idBabysitting!, babysittingToSend).subscribe({
        next: () => {
          this.toastr.success('Le contrat a été mis à jour avec succès.', 'Contrat modifié !');
          this.router.navigate(['/home']);
        },
        error: err => {
          console.error("❌ Erreur modification :", err);
          this.toastr.error('Une erreur est survenue lors de la modification.');
        }
      });
    } else {
      // this.babysittingService.create(babysittingToSend).subscribe({
      //   next: () => {
      //     this.toastr.success('Votre contrat de baby-sitting a été enregistré.', 'Contrat créé !');
      //     this.router.navigate(['/home']);
      //   },
      //   error: err => {
      //     console.error("❌ Erreur ajout :", err);
      //     if (err.status === 400 && err.error?.message?.includes("chevauche")) {
      //       this.toastr.error('Un autre contrat existe pour ce bébé sur les dates choisies.', 'Chevauchement détecté');
      //     } else {
      //       this.toastr.error('Une erreur est survenue lors de l\'ajout du contrat.');
      //     }
      //   }
      // });
      this.babysittingService.create(babysittingToSend).subscribe({
        next: (createdContract) => {
          this.toastr.success('Votre contrat de baby-sitting a été enregistré.', 'Contrat créé !');
          
          // 🔁 Redirection vers formulaire d'avis avec l'id du contrat créé
          // this.router.navigate(['/review/babysitting', createdContract.idBabysitting]); 
           // ✅ Remplace par :
           this.router.navigate(['/home']);
        },
        error: err => {
          console.error("❌ Erreur ajout :", err);
          this.toastr.error('Une erreur est survenue lors de l\'ajout du contrat.');
        }
      });
      
    }
  }
  
  

  formatDateToInput(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  // 🔹 Ajout de la méthode submitReview
  submitReview(): void {
    if (!this.review.name || !this.review.rating || !this.review.comment) return;
  
  
    const reviewToSend : BabysittingReview = {
      name: this.review.name,
      comment: this.review.comment,
      rating: this.review.rating,
      babysittingId: this.babysittingIdToShow
    };

    console.log("📌 ID du contrat envoyé dans la review :", this.babysittingIdToShow);

    this.reviewService.createReview(reviewToSend).subscribe({
      next: (savedReview) => {
        this.reviews.unshift(savedReview);
        this.review = { name: '', rating: 0, comment: '' };
        this.toastr.success('Avis ajouté !');
      },
      error: (err) => {
        console.error("❌ Erreur lors de l'envoi du review :", err);
        this.toastr.error("Erreur lors de l'envoi du review");
      }
    });
  }
  

  
  setRating(value: number): void {
    this.review.rating = value;
  }
  loadReviews(babysittingId: number): void {
    this.reviewService.getReviewsByBabysittingId(babysittingId).subscribe({
      next: (data) => {
        this.reviews = data;
        console.log("⭐ Reviews récupérées :", data);
      },
      error: (err) => console.error("❌ Erreur chargement reviews :", err)
    });
  }
  
  
  
}
