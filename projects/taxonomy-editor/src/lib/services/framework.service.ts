import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { FRAMEWORK } from '../constants/data'
import { NSFramework } from '../models/framework.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  // termSubject: Subject<any>
  list: any[] = []
  environment
  libConfig: IConnection
  frameworkId: string;
  constructor(
    private http: HttpClient,
    public localConfig: LocalConnectionService
    // @Inject(LibConnectionService) private config
  ) {
    // this.fillCategories()
  
  }

  getFrameworkInfo(): Observable<any> {
    if (this.localConfig.connectionType === 'online') {
      return this.http.get(`/api/framework/v1/read/${this.localConfig.frameworkName}`).pipe(
        tap(),
        catchError((err) => {
          throw 'Error in source. Details: ' + err; // Use console.log(err) for detail
        }))
    } else {
      return of(FRAMEWORK)
    }
  }

  readTerms(frameworkId, categoryId, requestBody) {
    return this.http.post(`/api/framework/v1/term/search?framework=${frameworkId}&category=${categoryId}`, requestBody).pipe(
      map((res: any) => res.result))
  }

  createTerm(frameworkId, categoryId, requestBody) {
    return this.http.post(`/api/framework/v1/term/create?framework=${frameworkId}&category=${categoryId}`, requestBody)
  }

  updateTerm(frameworkId, categoryId, categoryTermCode, reguestBody) {
    return this.http.patch(`/api/framework/v1/term/update/${categoryTermCode}?framework=${frameworkId}&category=${categoryId}`, reguestBody)
  }

  publishFramework() {
    return this.http.post(`/api/framework/v1/publish/${this.environment.frameworkName}`, {}, { headers: { 'X-Channel-Id': this.environment.channelId } })
  }

  getUuid() {
    return uuidv4()
  }

  updateEnvironment(env) {
    this.environment = env
  }

  getEnviroment() {
    return this.environment
  }

  getFrameworkId() {
    return this.frameworkId
  }

  fillCategories() {
    this.resetAll()
    this.getFrameworkInfo().subscribe(response => {
      this.frameworkId = response.result.framework.code;
      console.log('response', response);
      // const obj = FRAMEWORK;
      // const columns: NSFramework.IColumnView[] = [];
      // const obj = response
      (response.result.framework.categories).forEach(a => {
        this.list.push({
          code: a.code,
          identifier: a.identifier,
          index: a.index,
          name: a.name,
          status: a.status as NSFramework.TNodeStatus,
          description: a.description,
          translations: a.translations,
          children: (a.terms || []).map(c => {
            const associations = c.associations || []
            if (associations.length > 0) {
              Object.assign(c, { children: associations })
              delete c.associations
            }
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
    }, () => {
      this.list = []
      this.categoriesHash.next([])
    })
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
  resetAll() {
    this.categoriesHash.next([])
    this.currentSelection.next(null)
    this.list = []
  }
  isLastColumn(colCode) {
    return this.categoriesHash.value && (this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === colCode
    })) === (this.categoriesHash.value.length - 1)
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

 setTerm(res){
    // this.termSubject.next(res)
    localStorage.setItem('term', JSON.stringify(res))
  }

  getTerm() {
    return JSON.parse(localStorage.getItem('term')) || ''
  }

}
