import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    const request = req.clone({  
      setHeaders: {  
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSSXZtaHRpTkxRT1lKT3dYR2xnRElReFp4bHdyZmVTZCJ9.onjwk3QTql0oZYvM-xOPuCDcBJKGTVa65J64j2hy8H0`  
      }  
    }); 
    return next.handle(request)
  }
}
  