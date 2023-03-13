import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FrameworkService } from './framework.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private frameWorkServie: FrameworkService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    const env = this.frameWorkServie.getEnviroment()
    const request = req.clone({  
      setHeaders: {  
        Authorization: env.authToken,  
        // channelId: env.channelId
        userToken:env.userToken
      }  
    }); 
    return next.handle(request)
  }
}
  