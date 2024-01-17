import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        if (this.router.url.startsWith('/auth')) {
          return throwError(() => errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleError(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return this.handleNotFound(error);
    } else if (error.status === 400) {
      return this.handleBadRequest(error);
    } else if (error.status === 401) {
      return this.handleUnauthorized(error);
    } else if (error.status === 403) {
      return this.handleForbidden(error);
    } else if (error.status === 500) {
      return this.handleInternalServer(error);
    } else {
      return `Error: ${error.message}`;
    }
  }

  private handleForbidden(error: HttpErrorResponse): string {
    this.router.navigate(['/error/500'], {
      queryParams: { returnUrl: this.router.url },
    });

    return 'Forbidden';
  }
  private handleInternalServer(error: HttpErrorResponse): string {
    this.router.navigate(['/error/500'], {
      queryParams: { returnUrl: this.router.url },
    });

    return 'Interal Server Error';
  }

  private handleNotFound(error: HttpErrorResponse): string {
    // if (this.router.url.search('/list') === -1) {
    //   this.router.navigate(['/error/404']);
    // }
    // I want to make error/404 for only client pages not the server responses.
    return error.message;
  }

  private handleUnauthorized(error: any): string {
    if (this.router.url.startsWith('/auth')) {
      // console.log(error.error.errorMessage);
      return error.error.errorMessage;
    } else {
      this.router.navigate(['/error/unauthorized'], {
        queryParams: { returnUrl: this.router.url },
      });
      return error.message;
    }
  }

  private handleBadRequest(error: HttpErrorResponse): string {
    if (this.router.url === '/auth/register') {
      return error.error.errors;
    } else if (this.router.url.startsWith('/auth')) {
      return error.error;
      // let message = '';
      // const values: string[] = Object.values(error.error.errors);

      // values.map((m: string) => {
      //   message += m + '<br>';
      // });
      // return message.slice(0, -4);
    } else {
      this.router.navigate(['/error/bad-request']);
      return error.error ? error.error : error.message;
    }
  }
}
