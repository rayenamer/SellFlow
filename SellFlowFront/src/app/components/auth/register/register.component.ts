import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ JsonPipe  ,ReactiveFormsModule, RouterModule, ToastrModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  
  validationErrors: string[] = [];
  model: any = {};
  registerForm: FormGroup = new FormGroup({});
  isLoading = false;
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = new FormGroup({
      Gender: new FormControl('male'),
      Username: new FormControl ('', Validators.required),
      city: new FormControl ('', Validators.required),
      Country: new FormControl ('', Validators.required),
      PhoneNumber: new FormControl ('', Validators.required), // ✅ Add this
      Email: new FormControl ('',[ Validators.required,Validators.email]),
      Password: new FormControl( '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
        this.passwordRequiresDigit(),
        this.passwordRequiresLower(),
        this.passwordRequiresLower(),
        this.passwordRequiresUniqueChars(),
      ])
    });

  }
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

  register() {
    console.log(this.registerForm.value,this.registerForm.status);
    //this.isLoading = true;
    //console.log("Register form values:", this.registerForm.value);
    //this.authService.register(this.registerForm.value).subscribe({
    //  next: _ => {
//
    //    console.log("success")
    //  },
    //  error: (error) => {
    //    this.validationErrors = error;
//
    //},
    //
    //});
  }

}







