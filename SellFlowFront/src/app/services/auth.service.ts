import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { catchError, map, throwError } from 'rxjs';

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
    return this.http.post<User>(this.baseUrl + 'Register_Login/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'Register_Login/register', model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      }),
      catchError((error) => {
        // Pass the error to the component (you can modify this logic based on the error structure)
        return throwError(() => new Error(error));  // you should see it
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  
}
