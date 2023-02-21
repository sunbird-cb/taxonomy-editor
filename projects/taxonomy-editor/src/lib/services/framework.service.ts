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
  currentSelection: BehaviorSubject<any[] | []> = new BehaviorSubject<any[] | []>([])

  constructor() {
    this.fillCategories()
  }

  getFrameworkInfo() {
    return of(FRAMEWORK)
  }
  fillCategories() {
    const obj = FRAMEWORK
    const categories = [];
    const termsCategory: NSFramework.ITermsByCategory[] = [];
    (obj.result.framework.categories).forEach(a => {
      const obj = {
        categoryIdentifier: a.identifier,
        categoryCode: a.code,
        categoryName: a.name,
        categoryLevel: a.index,
      }
      categories.push({
        identifier: a.identifier,
        code: a.code,
        translations: a.translations,
        name: a.name,
        description: a.description,
        index: a.index,
        status: a.status,
        terms: a.terms
      } as NSFramework.ICategory)
      // const terms = this.getTerms(a.terms as NSFramework.ITerm[])
      // termsCategory.push({
      //   ...obj,
      //   terms: terms
      // })

    })
    //////////////////////////////////////////////
    this.categoriesHash.next(categories)
    // console.log(this.categoriesHash.value)
    ////////////////////////////////////////////
    // this.termsByCategory.next(termsCategory)
    // console.log('termsByCategory', this.termsByCategory.value)
    // console.log(this.findTerms('gradeLevel'))
    this.findAssociations('gradeLevel')

  }
  // private getTerms(terms: NSFramework.ITerm[]): NSFramework.ITerm[] {
  //   return terms.map(t => {
  //     return {
  //       identifier: t.identifier,
  //       code: t.code,
  //       translations: t.translations,
  //       name: t.name,
  //       description: t.description,
  //       index: t.index,
  //       category: t.category,
  //       status: t.status,
  //       associations: t.associations,
  //     }
  //   })
  // }
  findTerms(categoryCode: string, termCode: string): any {
    const allTermsOfCategory = [...this.categoriesHash.getValue()].filter(c => { return c.code === categoryCode }).shift().terms
    if (!termCode) {
      return allTermsOfCategory
    } else {
      return allTermsOfCategory.filter(ct => { return ct.code === termCode })
    }
  }
  findAssociations(categoryCode: string) {
    const lst = (this.flatDeep([...this.categoriesHash.value].map(t => t.terms)) || []).filter(t => {
      return t.category === categoryCode
    })
    // console.log('fLst', lst)

  }
  // getCategory(): Observable<any> (

  // )
  private flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatDeep(val, d - 1) : val), []) : arr.slice();
  };
  setSelected(cat: NSFramework.ICategory, term) {
    let old = this.currentSelection.getValue() as any[]
    const idx = old.findIndex(ot => {
      return ot.cat && ot.cat.code === cat.code
    })
    if (idx === -1) {
      old.push({ cat, current: term })
      this.currentSelection.next(old)
    } else {
      const filteredOld = old.filter(ot => { return ot.cat && ot.cat.index >= cat.index })
      if (filteredOld.length > 0) {
        filteredOld.forEach(fa => {
          old = this.removeItemFromArray(old, fa)
        })
      }
      old.push({ cat, current: term })
      this.currentSelection.next(old)
    }
  }
  getNextLevel(cat: NSFramework.ITermCard) {
    debugger
    // console.log("getNextLevel===>", this.categoriesHash.getValue().filter(f => { return f.index === cat.term.index + 1 })[0])
    console.log("getNextLevel", cat)
    console.log("this.categoriesHash.getValue()", this.categoriesHash.getValue())
    const CurrentIdx = this.categoriesHash.getValue().findIndex((f => { return (f.code || '') === cat.category; })) + 1

    return this.categoriesHash.getValue().filter(f => { return f.index === CurrentIdx + 1 })[0]
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
