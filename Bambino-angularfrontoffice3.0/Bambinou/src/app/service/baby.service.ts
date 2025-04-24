import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Baby } from '../model/baby';

@Injectable({
  providedIn: 'root'
})
export class BabyService {
  private baseUrl = 'http://localhost:8089/baby';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Baby[]> {
    return this.http.get<Baby[]>(`${this.baseUrl}/retrieve-all`);
  }

  getById(id: number): Observable<Baby> {
    return this.http.get<Baby>(`${this.baseUrl}/retrieve/${id}`);
  }

  addBaby(baby: Baby): Observable<Baby> {
    return this.http.post<Baby>(`${this.baseUrl}/add`, baby);
  }

  updateBaby(id: number, baby: Baby): Observable<Baby> {
    return this.http.put<Baby>(`${this.baseUrl}/modify/${id}`, baby);
  }

  deleteBaby(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }
  getBabiesByParent(id: number): Observable<Baby[]> {
    return this.http.get<Baby[]>(`http://localhost:8089/baby/by-parent/${id}`);
  }
  
}
