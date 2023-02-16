import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { FRAMEWORK } from '../constants/data'
import { NSFramework } from '../models/framework.model';
@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  categoriesHash: BehaviorSubject<NSFramework.Icategory> = new BehaviorSubject<NSFramework.Icategory>({})
  selectedCategoryHash: BehaviorSubject<NSFramework.ISelectedCategory | []> = new BehaviorSubject<NSFramework.ISelectedCategory | []>([])


  constructor() { }

  getFrameworkInfo(){
    return of(FRAMEWORK)
  }

}
