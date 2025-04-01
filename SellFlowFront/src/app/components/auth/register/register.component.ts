import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TextInputComponent } from '../../../form/text-input/text-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TextInputComponent,ReactiveFormsModule,RouterModule,FormsModule, ToastrModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];
  model : any = {};
  isLoading = false;
    private fb = inject(FormBuilder);
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = this.fb.group({
      Gender: ['male'],
      Username: ['', Validators.required],
      city: ['', Validators.required],
      Country: ['', Validators.required],
      PhoneNumber: ['', Validators.required], // ✅ Add this
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
        this.passwordRequiresDigit(),
        this.passwordRequiresLower(),
        this.passwordRequiresUpper(),
        this.passwordRequiresUniqueChars(),
      ]]
    });

  }
  
  

  

  register() {
    this.isLoading = true;
    console.log("Register form values:", this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: _ => {

        console.log("success")
      },
      error: error => {
        this.validationErrors = error
      },
    });
  }

  //Password Controls
  passwordRequiresDigit(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /\d/;
      return regex.test(control.value) ? null : { PasswordRequiresDigit: 'Passwords must have at least one digit.' };
    };
  }
  
  passwordRequiresLower(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /[a-z]/;
      return regex.test(control.value) ? null : { PasswordRequiresLower: 'Passwords must have at least one lowercase letter.' };
    };
  }
  
  passwordRequiresUpper(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /[A-Z]/;
      return regex.test(control.value) ? null : { PasswordRequiresUpper: 'Passwords must have at least one uppercase letter.' };
    };
  }
  
  passwordRequiresUniqueChars(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const uniqueChars = new Set(value.split(''));
      return uniqueChars.size < value.length
        ? { PasswordRequiresUniqueChars: 'Passwords must use at least one different character.' }
        : null;
    };
  }

}
  
  
  
  



