import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { FRAMEWORK } from '../constants/data'
@Injectable({
  providedIn: 'root'
})
export class FrameworkService {

  constructor() { }

  getFrameworkInfo(){
    return of(FRAMEWORK)
  }

}
