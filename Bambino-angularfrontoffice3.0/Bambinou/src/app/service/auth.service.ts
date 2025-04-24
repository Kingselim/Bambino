import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User = {
    id: 4, // 🟡 À remplacer plus tard dynamiquement
    name: 'Parent',
    email: 'parent@example.com',
    age: 30,
    password: 'demo1234', // 🔐 requis par le modèle, même si on ne l’utilise pas ici
    roleType: 'PATIENT' // ou [] si tu n’utilises pas encore les rôles
    // Ajoute les champs que tu veux
  };

  getCurrentUser(): User {
    return this.currentUser;
  }
}
