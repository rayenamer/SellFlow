import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path: 'registerservice', component: RegisterComponent},
    { path: 'resetpass', component: ResetPasswordComponent },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];
