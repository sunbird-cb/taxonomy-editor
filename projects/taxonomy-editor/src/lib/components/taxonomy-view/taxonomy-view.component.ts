import { Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTermComponent } from '../create-term/create-term.component';
import { ConnectorComponent } from '../connector/connector.component';
import { LocalConnectionService } from '../../services/local-connection.service';
import { IConnectionType } from '../../models/connection-type.model';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../services/connector.service';
import { ApprovalService } from '../../services/approval.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { elementAt } from 'rxjs/operators';
import { defaultConfig, headerLineConfig } from '../../constants/app-constant';
declare var LeaderLine: any;
@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.scss']
})
export class TaxonomyViewComponent implements OnInit {
  @Input() approvalList: any = []
  @Input() isApprovalView: any = false;
  @Input() workFlowStatus: string;
  @Output() sentForApprove = new EventEmitter()
  mapping = {};
  heightLighted = []
  localList = []
  showPublish = false
  newTermSubscription: Subscription = null
  loaded: any = {}
  showActionBar = false
  approvalRequiredTerms = []
  draftTerms = []
  isLoading = false;
  categoryList:any = [];
  constructor(private frameworkService: FrameworkService, 
    private localSvc: LocalConnectionService, 
    public dialog: MatDialog, 
    private approvalService: ApprovalService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private connectorSvc: ConnectorService) { }

  ngOnInit() {
    this.init()
    // this.frameworkService.isDataUpdated.subscribe(() => {
    //   this.updateLocalData()
    // })
    // debugger
    this.showActionBar = this.isApprovalView?true:false;
    
  }
  ngOnChanges(){
    this.draftTerms = this.approvalList;
  }
  init() {
  
    // this.frameworkService.getFrameworkInfo().subscribe(res => {
    //   this.frameworkData = res.result.framework.categories
    //   this.frameworkCode = res.result.framework.code
    // })
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      this.connectorSvc.removeAllLines()
      this.updateLocalData()
      this.frameworkService.categoriesHash.value.forEach((cat:any) => {
        this.loaded[cat.code] = true
      })
      this.isLoading = false
        setTimeout(() => {
             this.drawHeaderLine(res.result.framework.categories.length);  
        },500)
    })
    // this.newTermSubscription = this.frameworkService.termSubject.subscribe((term: any) => {
    //   // if (term)
    //   this.updateTerms()
    // })
  }
  // ngAfterContentChecked(){
  //   setTimeout(() => {
  //     this.drawHeaderLine(4);  
  //   },3000)
  // }

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
  updateFinalList(data: { selectedTerm: any, isSelected: boolean, parentData?: any, colIndex?: any }) {
    
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
    if(data.colIndex === 0 && !data.isSelected) {
      this.isLoading = true;
      setTimeout(()=> {
        this.init()
      },3000)
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
        if (res && res.created) {
          this.showPublish = true
        }
        this.loaded[res.term.category] = false
        // wait
        const parentColumn = this.frameworkService.getPreviousCategory(res.term.category)
        res.parent = null
        if (parentColumn) {
          res.parent = this.frameworkService.selectionList.get(parentColumn.code)
          res.parent.children? res.parent.children.push(res.term) :res.parent['children'] = [res.term]
          // res.parent.associations?.push(res)
        }
        // this.frameworkService.setTerm = res;
        this.updateFinalList({ selectedTerm: res.term, isSelected: false, parentData: res.parent, colIndex:colIndex })
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
  
  drawHeaderLine(len){
    const options = {...defaultConfig,...headerLineConfig }
        for(let i=1; i<len; i++){
          const startEle = document.querySelector(`#box${i}Header`)
          const endEle = document.querySelector(`#box${i+1}Header`)
          const line = new LeaderLine(startEle, endEle, options);
         }
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
  // get list() {
  //   let termsWithDraftStatus = []
  //   console.log('this.frameworkService.list :: ',this.frameworkService.list)
  //   this.frameworkService.list.forEach((cat,i) => {
  //       termsWithDraftStatus = cat.children.filter(t => t.approvalStatus === 'Draft')
  //       this.updateDraftStatusTerms(termsWithDraftStatus)
  //   })
  //   this.showActionBar = this.approvalRequiredTerms.length > 1 ? true:false
  //   return this.frameworkService.list
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

  updateDraftStatusTerms(event){
    
    if(event.checked) {
      this.draftTerms.push(event.term)
      } else {
      this.draftTerms = this.draftTerms.filter(d => event.term.identifier !== d.identifier)
    }
    this.showActionBar = this.draftTerms.length>0?true:false
  }

  getNoOfCards(event:any) {
    if(this.categoryList.length > 0 && event.category !== '') {
      let index = this.categoryList.findIndex((obj:any) => obj.category == event.category);
      if(index > -1) {
        this.categoryList.splice(index);
      }
    }
    if(event.category == '') {
      this.categoryList[this.categoryList.length-1].count = 0;
    }
    this.categoryList.push(event);
  }
  


  sendForApproval(){
    if(!this.isApprovalView){
        let parentList = []
        this.list.forEach(ele => {
          const t = ele.children.filter(term => term.selected === true)
          if(t[0]){
            parentList.push(t[0])
          } 
        })
        const req = {
          updateFieldValues:[...parentList, ...this.draftTerms]
        }
        this.approvalService.createApproval(req).subscribe(res => {
          this.frameworkService.removeOldLine()
          this._snackBar.open('Terms successfully sent for Approval.', 'cancel')
          // this.router.navigate(['/approval'])
          // this.showActionBar = false;
        })
    } else {
      this.sentForApprove.emit(this.draftTerms)
      console.log(this.draftTerms)
    }
   
  }

  closeActionBar(e){ 
    this.showActionBar = false;
  }
}
