import { Component, Input, OnInit } from '@angular/core';
import { NSFramework } from '../../models/framework.model';
import { FrameworkService } from '../../services/framework.service';
import { ConnectorService } from '../../services/connector.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CreateTermComponent } from '../create-term/create-term.component'

@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.css']
})
export class TaxonomyViewComponent implements OnInit {
  @Input() frameworkData: any
  framework
  mapping = {};

  constructor(private frameworkService: FrameworkService, private connectorService: ConnectorService, public dialog: MatDialog) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      this.framework = res.result.framework.categories
    })
    this.mapping = {
      board: {
        box0card0: ['asd','box1card2', 'box1card3']
      },
      medium: {
        box1card1: ['box2card5','box2card7', 'box2card9']
      },
      grade: {
        box2card7: ['box3card2','box3card3', 'box3card10']
      },
      subject: {

      }
    }
  }

  public setSourceTarget(elementClicked, cat, term) {
    console.log('test ', elementClicked, cat, term)
    console.log(cat.code)
    if (cat.code === 'board') {
      this.connectorService._drawLine('box0card0', this.mapping['board']['box0card0'], {
        startPlug: 'disc', endPlug: 'disc', color: 'black'
      }, 'box0', 'box1')
    } else if (cat.code === 'medium') {
      this.connectorService._drawLine('box1card1', this.mapping['medium']['box1card1'], {
        startPlug: 'disc', endPlug: 'disc', color: 'black'
      }, 'box0', 'box1')
    } else if (cat.code === 'gradeLevel') {
      this.connectorService._drawLine('box2card7', this.mapping['grade']['box2card7'], {
        startPlug: 'disc', endPlug: 'disc', color: 'black'
      }, 'box0', 'box1')
    }
  }
  
  openCreateTermDialog(name){
    const dialog = this.dialog.open(CreateTermComponent, {
       data: { name:name },
       width: '500px',
       panelClass: 'custom-dialog-container' 
      })
    dialog.afterClosed().subscribe(res => {
      console.log(`Dialog result: ${res}`)
    })
  }

}
