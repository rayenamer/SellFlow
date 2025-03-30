
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
