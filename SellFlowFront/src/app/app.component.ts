import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    //this.setCurrentUser();
  }
  private authService = inject(AuthService);

  //setCurrentUser(){
  //  const userString = localStorage.getItem('user');
  //  if(!userString) return;
  //  const user = JSON.parse(userString);
  //  this.authService.setCurrentUser(user);
  // 
//
  //}
}
