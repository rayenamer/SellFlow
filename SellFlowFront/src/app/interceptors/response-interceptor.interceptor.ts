import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

export const ResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event) => {
        // Check if the response is of type HttpResponse
        if (event instanceof HttpResponse) {
          console.log('Response Body:', event);  // Logs the body of the response
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          console.error('Error Response:', err.error);  // Logs the error array or error object from the response
        }
        return throwError(() => err.error); 
      }
    })
  );
};
