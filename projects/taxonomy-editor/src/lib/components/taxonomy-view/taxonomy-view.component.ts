import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTermComponent } from '../create-term/create-term.component';
import { ConnectorComponent } from '../connector/connector.component';
import { LocalConnectionService } from '../../services/local-connection.service';
import { IConnectionType } from '../../models/connection-type.model';
import { ConnectorService } from '../../services/connector.service';

@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.css']
})
export class TaxonomyViewComponent implements OnInit {
  @Input() frameworkData: any
  mapping = {};
  heightLighted = []
  showPublish = false
  constructor(
    private frameworkService: FrameworkService,
    private localSvc: LocalConnectionService,
    public dialog: MatDialog,
    private connectorSvc : ConnectorService
  ) { }

  ngOnInit() {
    this.init()

  }
  init() {
    // this.frameworkService.getFrameworkInfo().subscribe(res => {
    //   this.frameworkData = res.result.framework.categories
    //   this.frameworkCode = res.result.framework.code
    // })
    this.connectorSvc.removeAllLines()
    this.frameworkService.fillCategories()
    // this.mapping = {
    //   board: {
    //     box0card0: ['asd', 'box1card2', 'box1card3']
    //   },
    //   medium: {
    //     box1card1: ['box2card5', 'box2card7', 'box2card9']
    //   },
    //   grade: {
    //     box2card7: ['box3card2', 'box3card3', 'box3card10']
    //   },
    //   subject: {

    //   }
    // }
  }

  updateTaxonomyTerm(selected: any) {
    let pos;
    if (this.heightLighted.length === 0) {
      this.heightLighted.push(selected);
      return
    }
    this.heightLighted.forEach((cat, i) => {
      if (cat.element.category.toLowerCase() === selected.element.category.toLowerCase()) {
        pos = i
        return
      } 
     })
     if(pos === 0){
      this.heightLighted[pos] = selected
      this.heightLighted.splice(pos+1, this.heightLighted.length-pos)
      return
     }
     if(!pos){
      this.heightLighted.push(selected)
      } else {
        this.heightLighted.splice(pos+1, this.heightLighted.length-pos)
        this.heightLighted[pos] = selected
      }
  }

  openCreateTermDialog(column, colIndex) {
    const dialog = this.dialog.open(CreateTermComponent, {
      data: { columnInfo: column, frameworkId: this.frameworkService.getFrameworkId(), selectedparents: this.heightLighted, colIndex: colIndex },
      width: '400px',
      panelClass: 'custom-dialog-container'
    })
    dialog.afterClosed().subscribe(res => {
      // if (res && res.created) {
      //   this.showPublish = true
      // }
      res.columnInfo = column,
      res.parentTerms = this.heightLighted
      this.frameworkService.setTerm(res);
      this.init()
    })
  }

  get list() {
    // console.log('this.frameworkService.list :: ',this.frameworkService.list)
    return this.frameworkService.list

  }
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
