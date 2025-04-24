import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BabysittingReview } from '../model/BabysittingReview';
import { Review } from '../model/review';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8089/review';

  constructor(private http: HttpClient) {}

  getReviewsByBabysitting(idBabysitting: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-babysitting/${idBabysitting}`);
  }
  
  getReviewsByBabysittingId(babysittingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-babysitting/${babysittingId}`);
  }
  getReviewsByBabysitterId(babysitterId: number): Observable<BabysittingReview[]> {
    return this.http.get<BabysittingReview[]>(`${this.baseUrl}/babysitter/${babysitterId}`);
  }
  // ✅ POST vers /review/add
  createReview(review: BabysittingReview): Observable<BabysittingReview> {
    return this.http.post<BabysittingReview>(`${this.baseUrl}/add`, review);
  }
  getReviewsByBabysittingContract(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-babysitting/${id}`);
  }

  getAverageRatingByBabysitter(babysitterId: number) {
    return this.http.get<number>(`http://localhost:8089/review/average-rating/${babysitterId}`);
  }
  
  getAllReviews() {
    return this.http.get<any[]>(`http://localhost:8089/review/all`);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
  getReviewsByBabysitter(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/by-babysitter/${id}`);
  }
  
  
}

