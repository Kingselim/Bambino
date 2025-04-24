import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskPredictionService {
  private apiUrl = 'http://localhost:5002/predict-risk';

  constructor(private http: HttpClient) {}

  predictRisk(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
