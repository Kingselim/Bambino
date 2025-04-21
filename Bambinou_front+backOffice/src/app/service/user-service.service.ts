import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // URL = 'http://localhost:3000/users';
  URL = 'http://localhost:8089/user';
  constructor(private http: HttpClient) { }

  getAvailableUsersForNutrition(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8089/user/available-for-nutrition');
  }
  
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.URL + '/list');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.URL + '/' + id);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.URL + '/remove-user/' + id);
  }

  addUser(res: User): Observable<User> {
    return this.http.post<User>(this.URL, res);
  }

  updateUser(id: number, res: User): Observable<User> {
    return this.http.put<User>(this.URL + '/' + id, res);
  }

}
