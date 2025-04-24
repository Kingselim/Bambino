import { Component, Input, OnInit } from '@angular/core';
import { BabysittingReviewService } from '../../service/babysitting-review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() babysittingId!: number;
  reviews: any[] = [];

  constructor(private reviewService: BabysittingReviewService) {}

  ngOnInit(): void {
    if (this.babysittingId) {
      this.reviewService.getReviewsByBabysitting(this.babysittingId).subscribe((data) => {
        this.reviews = data;
      });
    }
  }
}
