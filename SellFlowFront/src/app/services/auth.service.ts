import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  baseUrl = environment.apiUrl

  currentUser = signal<User | null>(null);
  errorMessage: any;

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  
}
