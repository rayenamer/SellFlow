import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [RouterModule, FormsModule, ToastrModule, RouterOutlet], // ✅ Ensure ToastrModule is imported
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent{
 
  authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  isLoading = false;
  model : any = {};


  login(){ 
    this.authService.login(this.model).subscribe({
      next: _ => {
        console.log('API response:', Response);
        console.log(this.authService.currentUser()?.username);
        this.isLoading = true;
      },
      error: (error) => {
        const errorTitle = error?.error?.title;
        const message = errorTitle === 'Unauthorized' 
          ? 'Wrong email or password' 
          : errorTitle === 'Invalid username' ||'One or more validation errors occurred' 
          ? 'Please write your credentials' 
          : errorTitle || 'An error occurred';
        
        this.toastr.error(message);
        this.isLoading = false;
      }
      
      
      
      
    })
  }
}
