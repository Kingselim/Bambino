/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PregnancyTrackings } from '../model/PregnancyTracking';
import {Forum} from '../model/Forum';
@Injectable({
  providedIn: 'root'
})
export class MonthlyTrackingService {
  private apiUrl = 'http://localhost:8080/api/forum';

  constructor(private http: HttpClient) {}

  save(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getByPregnancy(idPregnancyTracking: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?idPregnancyTracking=${idPregnancyTracking}`);
  }
  saveForumTracking(forumData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, forumData);
  }
  addForum(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, data); // Note the change to post and addition of data parameter
  }
}*/