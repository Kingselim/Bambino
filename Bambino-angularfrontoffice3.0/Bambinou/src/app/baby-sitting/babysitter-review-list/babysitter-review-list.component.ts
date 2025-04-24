import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/service/review.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-babysitter-review-list',
  templateUrl: './babysitter-review-list.component.html',
  styleUrls: ['./babysitter-review-list.component.css']
})
export class BabysitterReviewListComponent implements OnInit {

  reviews: any[] = [];
  babysittingId!: number;
  toastr: any;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const babysitterId = +this.route.snapshot.paramMap.get('id')!;
    console.log("📦 ID babysitter reçu :", babysitterId);
  
    this.reviewService.getReviewsByBabysitterId(babysitterId).subscribe({
      next: (data) => {
        console.log("✅ Avis reçus :", data);  // <--- IMPORTANT
        this.reviews = data;
      },
      error: (err) => {
        console.error("❌ Erreur lors de la récupération des avis :", err);
      }
    });
  }  

  getReviews(): void {
    this.reviewService.getReviewsByBabysittingId(this.babysittingId).subscribe({
      next: (data) => {
        this.reviews = data;
        console.log("✅ Reviews loaded :", data);
      },
      error: (err) => console.error("❌ Error loading reviews:", err)
    });
  }


deleteReview(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete this feedback.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#aaa'
  }).then((result) => {
    if (result.isConfirmed) {
      this.reviewService.deleteReview(id).subscribe({
        next: () => {
          this.toastr.success('Feedback deleted successfully!');
          // Rafraîchir la liste
          this.reviews = this.reviews.filter(r => r.idReview !== id);
          this.cdr.detectChanges(); // ✅ forcer la mise à jour visuelle
        },
        error: () => {
          this.toastr.error('Failed to delete feedback.');
        }
      });
    }
  });
}
}
