import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactionCount, ReactionType } from '../model/exercice-reaction.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciceReactionService {
  private baseUrl = 'http://localhost:8089/reactions';

  constructor(private http: HttpClient) {}

  react(exerciceId: number, type: ReactionType): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/react/${exerciceId}?type=${type}`, {});
  }

  getReactionCount(exerciceId: number): Observable<ReactionCount> {
    return this.http.get<ReactionCount>(`${this.baseUrl}/count/${exerciceId}`);
  }
}
