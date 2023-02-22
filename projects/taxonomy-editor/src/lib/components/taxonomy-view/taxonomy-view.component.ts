import { Component, Input, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { ConnectorService } from '../../services/connector.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.css']
})
export class TaxonomyViewComponent implements OnInit {
  @Input() frameworkData: any
  mapping = {};

  constructor(private frameworkService: FrameworkService, private connectorService: ConnectorService, public dialog: MatDialog) {
 
   }

  ngOnInit() {

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
  get list() {
    console.log(this.frameworkService.list)
    return this.frameworkService.list

  }
}
