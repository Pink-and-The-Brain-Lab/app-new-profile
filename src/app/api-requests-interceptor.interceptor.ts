import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageManager } from 'millez-components-lib/components';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsInterceptorInterceptor implements HttpInterceptor {

  private readonly localStorageManager = inject(LocalStorageManager);

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageManager.get<string>('token');
    const _request = request.clone({  
      setHeaders: {  
        Authorization: `Bearer ${token}`  
      }})
    return next.handle(_request);
  }
}
