import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BabysittingReview {
  idReview: number;
  rating: number;
  comment: string;
  reviewDate: Date;
  babysittingId: number;
  reviewerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class BabysittingReviewService {
  private baseUrl = 'http://localhost:8089/review';

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<BabysittingReview[]> {
    return this.http.get<BabysittingReview[]>(`${this.baseUrl}/test`);
  }

  getReviewsByBabysitting(id: number): Observable<BabysittingReview[]> {
    return this.http.get<BabysittingReview[]>(`${this.baseUrl}/by-babysitting/${id}`);
  }
}
