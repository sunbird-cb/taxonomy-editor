import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { FRAMEWORK } from '../constants/data'
import { NSFramework } from '../models/framework.model';
@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  categoriesHash: BehaviorSubject<NSFramework.ICategory[] | []> = new BehaviorSubject<NSFramework.ICategory[] | []>([])
  // termsByCategory: BehaviorSubject<NSFramework.ITermsByCategory[] | []> = new BehaviorSubject<NSFramework.ITermsByCategory[] | []>([])
  selectedCategoryHash: BehaviorSubject<NSFramework.ISelectedCategory[]> = new BehaviorSubject<NSFramework.ISelectedCategory[]>([])
  currentSelection: BehaviorSubject<{ type: string, data: any } | null> = new BehaviorSubject<{ type: string, data: any } | null>(null)
  list: any[] = []
  constructor() {
    this.fillCategories()
  }

  getFrameworkInfo() {
    return of(FRAMEWORK)
  }
  fillCategories() {
    const obj = FRAMEWORK;
    // const columns: NSFramework.IColumnView[] = [];
    (obj.result.framework.categories).forEach(a => {
      this.list.push({
        code: a.code,
        identifier: a.identifier,
        index: a.index,
        name: a.name,
        status: a.status as NSFramework.TNodeStatus,
        description: a.description,
        translations: a.translations,
        children: a.terms.map(c => {
          const associations = c.associations
          Object.assign(c, { children: associations })
          delete c.associations
          return c
        }),
      })

    })
    this.categoriesHash.next(this.list.map(a => {
      return {
        code: a.code,
        identifier: a.identifier,
        index: a.index,
        name: a.name,
        status: a.status as NSFramework.TNodeStatus,
        description: a.description,
        translations: a.translations,
      } as NSFramework.ICategory
    }))
  }
  getNextCategory(currentCategory: string) {
    const currentIndex = this.categoriesHash.value.findIndex(a => {
      return a.code === currentCategory
    })
    let categoryLength = this.categoriesHash.getValue().length
    return (currentIndex + 1) <= categoryLength ? this.categoriesHash.getValue()[currentIndex + 1] : null
  }
  childClick(event: { type: string, data: any }) {
    this.currentSelection.next(event)
  }

  removeItemFromArray(array, item) {
    /* assign a empty array */
    var tmp = [];
    /* loop over all array items */
    for (var index in array) {
      if (array[index] !== item) {
        /* push to temporary array if not like item */
        tmp.push(array[index]);
      }
    }
    /* return the temporary array */
    return tmp;
  }
}
