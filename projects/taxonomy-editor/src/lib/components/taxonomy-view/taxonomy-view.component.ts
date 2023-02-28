import { Component, Input, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTermComponent } from '../create-term/create-term.component';
import { ConnectorComponent } from '../connector/connector.component';
import { LocalConnectionService } from '../../services/local-connection.service';
import { IConnection } from '../../models/connection.model';
import { inherits } from 'util';

@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.css']
})
export class TaxonomyViewComponent implements OnInit {
  @Input() frameworkData: any
  mapping = {};
  frameworkCode: string;
  constructor(private frameworkService: FrameworkService, private localSvc: LocalConnectionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.init()

  }
  init() {
    // this.frameworkService.getFrameworkInfo().subscribe(res => {
    //   this.frameworkData = res.result.framework.categories
    //   this.frameworkCode = res.result.framework.code
    // })
    this.frameworkService.fillCategories()
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
  }
  openCreateTermDialog(categoryId, name) {
    const dialog = this.dialog.open(CreateTermComponent, {
      data: { name: name, frameworkId: this.frameworkCode, categoryId },
      width: '400px',
      panelClass: 'custom-dialog-container'
    })
    dialog.afterClosed().subscribe(res => {
      console.log(`Dialog result: ${res}`)
    })
  }
  get list() {
    // console.log('this.frameworkService.list :: ',this.frameworkService.list)
    return this.frameworkService.list

  }
  newConnection() {
    const dialog = this.dialog.open(ConnectorComponent, {
      data: {},
      width: '400px',
      // panelClass: 'custom-dialog-container' 
    })
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.localSvc.localStorage = res
        this.init()
      }

    })
  }
}
