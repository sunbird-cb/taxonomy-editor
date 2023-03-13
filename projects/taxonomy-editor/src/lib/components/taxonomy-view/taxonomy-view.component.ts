import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTermComponent } from '../create-term/create-term.component';
import { ConnectorComponent } from '../connector/connector.component';
import { LocalConnectionService } from '../../services/local-connection.service';
import { IConnectionType } from '../../models/connection-type.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.scss']
})
export class TaxonomyViewComponent implements OnInit {
  @Input() frameworkData: any
  mapping = {};
  heightLighted = []
  localList = []
  showPublish = false
  newTermSubscription: Subscription = null
  loaded: any = {}
  constructor(private frameworkService: FrameworkService, private localSvc: LocalConnectionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.init()
    // this.frameworkService.isDataUpdated.subscribe(() => {
    //   this.updateLocalData()
    // })
  }
  init() {
    // this.frameworkService.getFrameworkInfo().subscribe(res => {
    //   this.frameworkData = res.result.framework.categories
    //   this.frameworkCode = res.result.framework.code
    // })
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      this.updateLocalData()
      this.frameworkService.categoriesHash.value.forEach(cat => {
        this.loaded[cat.code] = true
      })
    })

    this.mapping = {
      board: {
        box0card0: ['asd', 'box1card2', 'box1card3']
      },
      medium: {
        box1card1: ['box2card5', 'box2card7', 'box2card9']
      },
      grade: {
        box2card7: ['box3card2', 'box3card3', 'box3card10']
      },
      subject: {

      }
    }
    // this.newTermSubscription = this.frameworkService.termSubject.subscribe((term: any) => {
    //   // if (term)
    //   this.updateTerms()
    // })
  }

  updateTaxonomyTerm(data: { selectedTerm: any, isSelected: boolean }) {

    this.updateFinalList(data)
    this.updateSelection(data.selectedTerm.category, data.selectedTerm.code)

    // if (this.heightLighted.length === 0) {
    //   this.heightLighted.push(data.selectedTerm);
    //   return
    // }
    // this.heightLighted.every((cat, i) => {
    //   if (cat.element.category.toLowerCase() === data.selectedTerm.element.category.toLowerCase()) {
    //     this.heightLighted[i] = data.selectedTerm
    //     return false
    //   } else {
    //     this.heightLighted.push(data.selectedTerm);
    //     return false
    //   }
    // })
  }
  updateSelection(category: string, selectedTermCode: string) {
    this.frameworkService.list.get(category).children.map(item => {
      item.selected = selectedTermCode === item.code ? true : false
      return item
    })
  }

  //need to refactor at heigh level
  updateFinalList(data: { selectedTerm: any, isSelected: boolean, parentData?: any }) {
    if (data.isSelected) {
      // data.selectedTerm.selected = data.isSelected
      this.frameworkService.selectionList.set(data.selectedTerm.category, data.selectedTerm)
      const next = this.frameworkService.getNextCategory(data.selectedTerm.category)
      if (next && next.code) {
        this.frameworkService.selectionList.delete(next.code)
      }
      // notify next
      this.frameworkService.insertUpdateDeleteNotifier.next({ action: data.selectedTerm.category, type: 'select', data: data.selectedTerm })
    }
    // insert in colum 
    // if (data.parentData) {
    //   this.frameworkService.list.get(data.selectedTerm.category).children.push(data.selectedTerm)
    //   const parent = this.frameworkService.getPreviousCategory(data.selectedTerm.category)
    //   if (parent && parent.code) {
    //     // insert in parent 
    //     this.frameworkService.list.get(parent.code).children.map(a => {
    //       if (data.parentData && a.code === data.parentData.code) {
    //         if (!a.children) {
    //           a.children = []
    //         }
    //         a.children.push(data.selectedTerm)
    //       }
    //     })
    //     this.frameworkService.isDataUpdated.next(true)
    //   }
    // } else if (!data.parentData && !data.isSelected) {
    //   this.frameworkService.list.get(data.selectedTerm.category).children.push(data.selectedTerm)
    // }
    setTimeout(() => {
      this.loaded[data.selectedTerm.category] = true
    }, 100);

  }
  isEnabled(columnCode: string): boolean {
    return !!this.frameworkService.selectionList.get(columnCode)
  }
  openCreateTermDialog(column, colIndex) {
    if (!this.isEnabled(column.code)) {
      const dialog = this.dialog.open(CreateTermComponent, {
        data: { columnInfo: column, frameworkId: this.frameworkService.getFrameworkId(), selectedparents: this.heightLighted, colIndex: colIndex },
        width: '400px',
        panelClass: 'custom-dialog-container'
      })
      dialog.afterClosed().subscribe(res => {
        debugger
        if (res && res.created) {
          this.showPublish = true
        }
        this.loaded[res.term.category] = false
        // wait
        const parentColumn = this.frameworkService.getPreviousCategory(res.term.category)
        res.parent = null
        if (parentColumn) {
          res.parent = this.frameworkService.selectionList.get(parentColumn.code)
        }
        this.frameworkService.setTerm = res;
        this.updateFinalList({ selectedTerm: res.term, isSelected: false, parentData: res.parent })
        debugger
        // this.frameworkService.insertUpdateDeleteNotifier.next({ type: 'insert', action: res.parent.code, data: res.term })
      })
    }
  }

  get list(): any[] {
    // console.log('this.frameworkService.list :: ',this.frameworkService.list)
    // if (this.localList.length === 0) {
    //   this.updateLocalData()
    // }
    // return this.localList
    return Array.from(this.frameworkService.list.values())
  }

  getColumn(columnCode: string) {
    return this.frameworkService.list.get(columnCode)
  }
  updateLocalData() {
    // this.localList = Array.from(this.frameworkService.list.values()).map(lst => {
    //   const selectedTerm = this.frameworkService.selectionList.get(lst.code)
    //   lst.children.map(ch => { ch.selected = selectedTerm && ch.identifier === selectedTerm.identifier })
    //   return lst
    // })

  }

  // get updatedCategories() {
  //   return this.updateTerms()
  // }
  // updateTerms(_term?: any) {
  //   const finalList = []
  //   this.list.forEach((category, idx) => {
  //     const localTerms = this.frameworkService.getLocalTermsByColumn(category.code)
  //     for (let j = 0; j < localTerms.length; j += 1) {
  // const previous = this.frameworkService.getPreviousCategory(category.code)
  // if (previous && finalList[idx - 1]) {
  //   finalList[idx - 1].children.forEach(lastParent => {
  //     localTerms[j].parent.forEach(parent => {
  //       if (lastParent.code === parent.element.code) {
  //         console.log("parent.element.code============>", parent.element.code)
  //         if (!lastParent.children) {
  //           lastParent.children = []
  //         }
  //         if (lastParent.children.findIndex(c => c.code === localTerms[j].code) === -1) {
  //           lastParent.children.unshift(localTerms[j])
  //         }
  //       }
  //     })
  //   });

  // }
  //       if (category.code === localTerms[j].category) {
  //         category.children.push(localTerms[j])
  //       }
  //     }
  //     finalList.push(category)
  //   })

  //   return finalList
  // }


  // if (localTerms.length > 0) {
  //   this.columnData.push(...localTerms)
  //   this.column.children.forEach(col => {
  //     localTerms.forEach(loc => {
  //       if (col.code !== loc.code) {
  //         loc.selected=true
  //         this.column.children.push(loc)
  //       }
  //     })
  // this.column.children.push(...localTerms)
  // }
  // }
  newConnection() {
    const dialog = this.dialog.open(ConnectorComponent, {
      data: {},
      width: '90%',
      // panelClass: 'custom-dialog-container' 
    })
    dialog.afterClosed().subscribe((res: IConnectionType) => {
      if ((res.source === 'online' && res.data.endpoint) || (res.source === 'offline')) {
        this.localSvc.localStorage = res
        this.init()
      } else if (res.source === 'online' && !res.data.endpoint) {
        this.localSvc.localStorage = res
        this.init()
      }
    })
  }
}
