import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
 private apiUrl = 'http://localhost:8089/forum';
  constructor(private http: HttpClient) { }

  getAllForums(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/retrieve-all`);
  }
  addForum(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, data); // Note the change to post and addition of data parameter
  }
}
