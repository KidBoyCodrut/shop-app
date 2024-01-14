import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(async (error: any) => {
        if (error instanceof HttpErrorResponse) {
          // Handle HTTP errors
          console.error('HTTP error:', error);
         //errorToast(error.message);
        } else {
          // Handle other types of errors
          console.error('Other error:', error);
          // You can add your custom error handling logic here
        }

        
        throw error;
      })
    );
  }
}
