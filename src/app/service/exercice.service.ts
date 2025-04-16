import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercice } from '../model/exercice.model';
@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  private apiUrl = 'http://localhost:8089/exercice';  // L'URL de ton API Spring Boot

  constructor(private http: HttpClient) {}

  // GET : Récupérer tous les exercices
  getAllExercices(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(`${this.apiUrl}/retrieve-all`);
  }

  // GET : Récupérer un exercice par ID
  getExerciceById(id: number): Observable<Exercice> {
    return this.http.get<Exercice>(`${this.apiUrl}/retrieve/${id}`);
  }

  getExercice(id: number): Observable<Exercice> {
    return this.http.get<Exercice>(`http://localhost:8089/exercice/retrieve/${id}`);
  }
  

  // POST : Ajouter un nouvel exercice
  addExercice(exercice: Exercice): Observable<Exercice> {
    return this.http.post<Exercice>(`${this.apiUrl}/add`, exercice);
  }

  // PUT : Modifier un exercice
  updateExercice(id: number, exercice: Exercice): Observable<Exercice> {
    return this.http.put<Exercice>(`${this.apiUrl}/modify/${id}`, exercice);
  }

  // DELETE : Supprimer un exercice
  deleteExercice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }
}
