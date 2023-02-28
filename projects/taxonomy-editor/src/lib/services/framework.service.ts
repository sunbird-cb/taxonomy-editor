import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { FRAMEWORK } from '../constants/data'
import { NSFramework } from '../models/framework.model';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { IConnection } from '../models/connection.model';
// import { LibConnectionService } from 'taxonomy-editor/lib/services/connection.service';
import { LocalConnectionService } from './local-connection.service';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  categoriesHash: BehaviorSubject<NSFramework.ICategory[] | []> = new BehaviorSubject<NSFramework.ICategory[] | []>([])
  // termsByCategory: BehaviorSubject<NSFramework.ITermsByCategory[] | []> = new BehaviorSubject<NSFramework.ITermsByCategory[] | []>([])
  selectedCategoryHash: BehaviorSubject<NSFramework.ISelectedCategory[]> = new BehaviorSubject<NSFramework.ISelectedCategory[]>([])
  currentSelection: BehaviorSubject<{ type: string, data: any, cardRef?: any } | null> = new BehaviorSubject<{ type: string, data: any, cardRef?: any } | null>(null)
  list: any[] = []
  environment
  libConfig:IConnection
  constructor(private http: HttpClient, 
    localConnectionService:LocalConnectionService
    // @Inject(LibConnectionService) private config
    ) {
    // this.libConfig = config;
    console.log('libConfig===>',localConnectionService.apiUrl)
    this.fillCategories()
  }
  public getConfig(): IConnection {
    return this.libConfig;
  }

  getFrameworkInfo(): Observable<any> {
    // return of(FRAMEWORK)
    return this.http.get(`${this.environment.url}/api/framework/v1/read/newmvp`)
  }

  readTerms(frameworkId, categoryId, requestBody) {
    return this.http.post(`${this.environment.url}/api/framework/v1/term/search?framework=${frameworkId}&category=${categoryId}`, requestBody).pipe(
      map((res: any) => res.result))
  }

  createTerm(frameworkId, categoryId, requestBody) {
    return this.http.post(`${this.environment.url}/api/framework/v1/term/create?framework=${frameworkId}&category=${categoryId}`, requestBody)
  }

  getUuid() {
    return uuidv4()
  }

  updateEnvironment(env) {
    this.environment = env
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
    const currentIndex = this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === currentCategory
    })
    let categoryLength = this.categoriesHash.getValue().length
    return (currentIndex + 1) <= categoryLength ? this.categoriesHash.getValue()[currentIndex + 1] : null
  }
  childClick(event: { type: string, data: any }) {
    this.currentSelection.next(event)
  }

  isLastColumn(colCode) {
    return this.categoriesHash.value && (this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === colCode
    })) === (this.categoriesHash.value.length-1)
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
