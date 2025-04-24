import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Babysitting } from '../model/Babysitting';
@Injectable({
  providedIn: 'root'
})
export class BabysittingService {
  private apiUrl = 'http://localhost:8089/babysitting';

  private selectedBabysitterId: number | null = null;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Babysitting[]> {
    return this.http.get<Babysitting[]>(`${this.apiUrl}/retrieve-all`);
  }

  getById(id: number): Observable<Babysitting> {
    return this.http.get<Babysitting>(`${this.apiUrl}/retrieve/${id}`);
  }

  create(babysitting: Babysitting): Observable<Babysitting> {
    return this.http.post<Babysitting>(`${this.apiUrl}/add`, babysitting);
  }

  update(id: number, babysitting: Babysitting): Observable<Babysitting> {
    return this.http.put<Babysitting>(`${this.apiUrl}/modify/${id}`, babysitting);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }

  setSelectedBabysitter(id: number): void {
    this.selectedBabysitterId = id;
  }

  getSelectedBabysitter(): number | null {
    return this.selectedBabysitterId;
  }

  clearSelectedBabysitter(): void {
    this.selectedBabysitterId = null;
  }
  getContractsByParent(parentId: number) {
    return this.http.get<Babysitting[]>(`${this.apiUrl}/parent/${parentId}`);
  }
  
  downloadContractPdf(id: number): void {
    const url = `http://localhost:8089/babysitting/pdf/${id}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `babysitting-contract-${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  getContractsByBabysitter(id: number): Observable<Babysitting[]> {
    return this.http.get<Babysitting[]>(`${this.apiUrl}/by-babysitter/${id}`);
  }
  
  getReviewsByBabysittingId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8089/review/by-babysitting/${id}`);
  }
  
  
}
