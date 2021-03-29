import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler,
         HttpEvent, HttpErrorResponse } 
from '@angular/common/http'

import { AuthService } from "../service/auth.service"
import { ErrorService } from '../service/error.service'
import { SuccessService } from '../service/success.service'

import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class HttpConfig implements HttpInterceptor {

  newToken

  constructor(
    private authService: AuthService,
    public errorService: ErrorService,
    public successService: SuccessService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
    const token: string = localStorage.getItem('formToken')
    
    if (token)
      request = request.clone(
        { headers: request.headers.set('x-access-token', token) }
      )

    if (!request.headers.has('Content-Type')) 
      request = request.clone(
        { headers: request.headers.set('Content-Type', 'application/json') }
      )
      
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event
      }),
      catchError((error: HttpErrorResponse) => {
        let errorCode = {}
        errorCode = {
          reason: error.error,
          status: error.status
        }
        this.errorService.popRequestErrorSnackbar(errorCode)
        return throwError(error)
      })
    )
  }

  // not working yet
  refreshToken(request) {
    this.authService.refreshToken().subscribe(token => {
      this.newToken = token
      localStorage.setItem('formToken', this.newToken)
    })
  }

}
