import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NearestExpertsService {
  private baseUrl = 'http://localhost:8089/expert'; // adjust as necessary

  constructor(private http: HttpClient) {}

  getNearestExperts(specialty: string, lat: number, lng: number, radius: number): Observable<any[]> {
    // Build query params:
    let params = new HttpParams()
      .set('specialty', specialty)
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('radius', radius.toString());
      
    return this.http.get<any[]>(`${this.baseUrl}/nearest-experts`, { params });
  }
}
