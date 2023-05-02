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
import { COLORS } from '../constants/app-constant';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  categoriesHash: BehaviorSubject<NSFramework.ICategory[] | []> = new BehaviorSubject<NSFramework.ICategory[] | []>([])
  // termsByCategory: BehaviorSubject<NSFramework.ITermsByCategory[] | []> = new BehaviorSubject<NSFramework.ITermsByCategory[] | []>([])
  isDataUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentSelection: BehaviorSubject<{ type: string, data: any, cardRef?: any } | null> = new BehaviorSubject<{ type: string, data: any, cardRef?: any } | null>(null)
  termSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  list = new Map<string, NSFramework.IColumnView>();
  selectionList = new Map<string, NSFramework.IColumnView>();
  insertUpdateDeleteNotifier: BehaviorSubject<{ type: 'select' | 'insert' | 'update' | 'delete', action: string, data: any }> = new BehaviorSubject<{ type: 'select' | 'insert' | 'update' | 'delete', action: string, data: any }>(null)
  environment
  libConfig: IConnection
  frameworkId: string;
  rootConfig: any;
  constructor(
    private http: HttpClient,
    public localConfig: LocalConnectionService
    // @Inject(LibConnectionService) private config
  ) {
    // this.fillCategories()

  }

  getFrameworkInfo(): Observable<any> {
    localStorage.removeItem('terms')
    if (this.localConfig.connectionType === 'online') {
      return this.http.get(`/api/framework/v1/read/${this.localConfig.frameworkName}`).pipe(
        tap((response: any) => {
          this.resetAll()
          this.formateData(response)
        }),
        catchError((err) => {
          this.list.clear()
          this.categoriesHash.next([])
          throw 'Error in source. Details: ' + err; // Use console.log(err) for detail
        }))
    } else {
      this.resetAll()
      return of(this.formateData(FRAMEWORK))
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


  getNextCategory(currentCategory: string) {
    const currentIndex = this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === currentCategory
    })
    let categoryLength = this.categoriesHash.getValue().length
    return (currentIndex + 1) <= categoryLength ? this.categoriesHash.getValue()[currentIndex + 1] : null
  }
  getPreviousCategory(currentCategory: string) {
    const currentIndex = this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === currentCategory
    })
    return (currentIndex - 1) >= 0 ? this.categoriesHash.getValue()[currentIndex - 1] : null
  }
  getParentTerm(currentCategory: string) {
    const parent = this.getPreviousCategory(currentCategory) || null
    return parent ? this.selectionList.get(parent.code) : null
  }
  childClick(event: { type: string, data: any }) {
    this.currentSelection.next(event)
  }
  resetAll() {
    this.categoriesHash.next([])
    this.currentSelection.next(null)
    this.list.clear()
  }
  isLastColumn(colCode) {
    return this.categoriesHash.value && (this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === colCode
    })) === (this.categoriesHash.value.length - 1)
    // return false
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
  // set setTerm(res: any) {
  //   this.termSubject.next(res)
  //   let oldTerms = ([...this.getTerm] || [])
  //   debugger
  //   if (!res.parent && res.created) {
  //     oldTerms.push(res.term)
  //   } else {
  //     if ((oldTerms.filter(ola => ola.code === res.parent.code) || []).length === 0) {
  //       if (!res.parent.children) {
  //         res.parent.children = []
  //       }
  //       res.parent.children.push(res.term)
  //       oldTerms.push(res.parent)
  //     } else {
  //       oldTerms.map(ot => {
  //         if (ot && ot.code === res.parent.code) {
  //           if (!ot.children) {
  //             ot.children = []
  //           }
  //           ot.children.push(res.term)
  //         }
  //       })
  //     }
  //   }
  //   localStorage.setItem('terms', JSON.stringify(oldTerms))
  // }
  set setTerm(res: any) {
    this.termSubject.next(res)
    let oldTerms = ([...this.getTerm] || [])
    oldTerms.push(res)
    localStorage.setItem('terms', JSON.stringify(oldTerms))
  }
  get getTerm(): any[] {
    return JSON.parse(localStorage.getItem('terms')) || []
  }
  getLocalTermsByParent(parentCode: string): any[] {
    const filteredData = this.getTerm.filter(x => {
      return x.parent && x.parent.category === parentCode
    }) || [];

    return filteredData.map(x => {
      return x.term
    })
  }
  getLocalTermsByCategory(parentCode: string): any[] {
    const filteredData = this.getTerm.filter(x => {
      return x.term && x.term.category === parentCode
    }) || [];

    return filteredData
  }
  getLocalTermsCategory(category: string): any[] {
    const filteredData = this.getTerm.filter(x => {
      return x.category === category
    }) || [];

    return filteredData
  }
  formateData(response: any) {
    this.frameworkId = response.result.framework.code;
    // console.log('response', response);
    // // const obj = FRAMEWORK;
    // // const columns: NSFramework.IColumnView[] = [];
    // // const obj = response
    (response.result.framework.categories).forEach((a, idx) => {
      // if (idx <= 1) {
      // const localData = this.getLocalTermsCategory(a.code)
      // console.log("localData============>", localData)
      this.list.set(a.code, {
        code: a.code,
        identifier: a.identifier,
        index: a.index,
        name: a.name,
        selected: a.selected,
        status: a.status as NSFramework.TNodeStatus,
        description: a.description,
        translations: a.translations,
        category:a.category,
        associations: a.associations,
        config: this.getConfig(a.code),
        // children: ([...a.terms, ...localData] || []).map(c => {
        children: (a.terms || []).map(c => {
          c =Object.assign(c, this.getConfig(c.category));
          const associations = c.associations || []
          if (associations.length > 0) {
            associations.forEach((val:any,index) => {
              associations[index] = Object.assign(val, this.getConfig(val.category));
            });
            Object.assign(c, { children: associations});
            // delete c.associations
          }
          return c
        })
      })
      // }
    });
    const allCategories = []
    this.list.forEach(a => {
      allCategories.push({
        code: a.code,
        identifier: a.identifier,
        index: a.index,
        name: a.name,
        status: a.status as NSFramework.TNodeStatus,
        description: a.description,
        translations: a.translations,
      } as NSFramework.ICategory)
    })
    this.categoriesHash.next(allCategories)

  }

  removeOldLine() {
    const eles = Array.from(document.getElementsByClassName('leader-line') || [])
    if(eles.length>0){
        eles.forEach(ele => ele.remove());
    }
  }


  setConfig(config: any) {
    this.rootConfig = config
  }

  getConfig(code: string) {
    let categoryConfig: any;
    this.rootConfig.forEach((config: any, index: number) => {
      if(this.frameworkId == config.frameworkId) {
        categoryConfig = config.config.find((obj: any) => obj.category == code);
      }
    });
    return categoryConfig;
  }

}
