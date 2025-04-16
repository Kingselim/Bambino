import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coaching } from '../model/coaching.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachingService {

  private readonly apiUrl = 'http://localhost:8089/coaching';

  constructor(private http: HttpClient) { }

  getAllCoachings(): Observable<Coaching[]> {
    return this.http.get<Coaching[]>(`${this.apiUrl}/retrieve-all`);
  }

  getCoachingById(id: number): Observable<Coaching> {
    return this.http.get<Coaching>(`${this.apiUrl}/retrieve/${id}`);
  }

  addCoaching(coaching: Coaching): Observable<Coaching> {
    return this.http.post<Coaching>(`${this.apiUrl}/add`, coaching);
  }

  updateCoaching(coaching: Coaching): Observable<Coaching> {
    return this.http.put<Coaching>(`${this.apiUrl}/modify/${coaching.idCoaching}`, coaching);
  }

  deleteCoaching(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }
  
}
