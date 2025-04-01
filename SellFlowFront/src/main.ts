import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { ResponseInterceptor } from './app/interceptors/response-interceptor.interceptor';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor,ResponseInterceptor])),
    provideRouter(routes),
    provideToastr({
      positionClass: 'toast-bottom-right'
     }),
    provideAnimations(),
  ]
}).catch(err => console.error(err));
