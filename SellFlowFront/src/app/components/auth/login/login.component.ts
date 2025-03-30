import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true, 
    imports: [FormsModule, ToastrModule], // ✅ Ensure ToastrModule is imported
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
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
      error: error => {
        this.toastr.error(error.error); // ✅ Ensure toastr is working
        this.isLoading = false;
      }
    })
  }
}
