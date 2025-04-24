import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BabysittingReview } from 'src/app/model/BabysittingReview';
import { ReviewService } from 'src/app/service/review.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-reviewbabysitter-form',
  templateUrl: './reviewbabysitter-form.component.html',
  styleUrls: ['./reviewbabysitter-form.component.css']
})
export class ReviewbabysitterFormComponent implements OnInit {

  review: BabysittingReview = {
    name: '',
    comment: '',
    rating: 0,
    babysittingId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.review.babysittingId = +id;
      console.log("🟢 ID contrat pour review :", this.review.babysittingId);
    }
  
    const user = this.authService.getCurrentUser();
    if (user) {
      this.review.name = user.name; // ✅ Injection automatique
      console.log("👤 Utilisateur connecté :", this.review.name);
    } else {
      console.warn("⚠️ Aucun utilisateur connecté !");
    }
  }
  

  setRating(value: number): void {
    this.review.rating = value;
  }

  submitReview(): void {
    if (!this.review.name || !this.review.comment || !this.review.rating) {
      this.toastr.error("Tous les champs sont requis !");
      return;
    }

    this.reviewService.createReview(this.review).subscribe({
      next: () => {
        this.toastr.success('Feedback submitted successfully! 📝', 'Success');
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error("❌ Erreur lors de l'envoi du review :", err);
        this.toastr.error("Erreur lors de l'envoi de l'avis.");
      }
    });
  }
  feedbackType: string = 'positive';

generatePositiveFeedback(): void {
  const compliments = [
    "The babysitter was incredibly kind and attentive.",
    "My child had an amazing time, thank you!",
    "Very professional and trustworthy babysitter.",
    "Would definitely recommend this babysitter!",
    "Excellent service, always punctual and reliable.",
    "Fantastic babysitter! So caring and attentive.",
    "My kids love her! Highly recommended.",
    "Always punctual, responsible, and kind.",
    "Great communication and very professional.",
    "I feel confident leaving my child with her.",
    "Genuinely cares about kids — a real gem!",
  "Truly outstanding care — truly one of a kind.",
  "Absolutely wonderful experience — would definitely recommend!",
  "Highly dependable — a fantastic experience overall.",
  "Made our child feel safe and happy — we feel very lucky to have found her.",
  "Would definitely recommend this babysitter to anyone looking for a reliable and caring babysitter.",
  "Excellent communication and attention to detail.",
  "Always punctual and reliable.",
  ];

  const randomIndex = Math.floor(Math.random() * compliments.length);
  this.review.comment = compliments[randomIndex];
}

}
