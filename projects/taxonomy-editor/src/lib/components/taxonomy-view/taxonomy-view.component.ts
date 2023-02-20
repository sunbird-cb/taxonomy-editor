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
  framework: NSFramework.ICategory[]
  mapping = {};
  terms: any[]
  currentCat = 'cbse'
  currentCatIdx = 1

  constructor(private frameworkService: FrameworkService, private connectorService: ConnectorService, public dialog: MatDialog) { }

  ngOnInit() {
    // this.frameworkService.getFrameworkInfo().subscribe(res => {
    // this.framework = res.result.framework.categories
    // })
    this.frameworkService.categoriesHash.subscribe(c => {
      this.framework = c
      if (this.frameworkService.currentSelection.value.length == 0) {
        this.frameworkService.currentSelection.next([{ cat: this.framework[0] }])
      }
    })
    console.log(this.framework)
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

  getTermsByCat(categoryCode: string, termCode: string, catIdx: number) {
    // debugger // can also subscribe
    if (this.isActive(null, catIdx)) {
      console.log(this.frameworkService.findTerms(categoryCode, termCode).length)
      return this.frameworkService.findTerms(categoryCode, termCode)
    }
    return []
  }
  public setSourceTarget(elementClicked, cat, term) {
    // console.log('test ', elementClicked, cat, term)
    this.currentCat = cat.code
    this.currentCatIdx = cat.index
    this.setClearSelection(cat, term)
    // console.log(cat.code)
    // if (cat.code === 'board') {
    //   this.connectorService._drawLine('box0card0', this.mapping['board']['box0card0'], {
    //     startPlug: 'disc', endPlug: 'disc', color: 'black'
    //   }, 'box0', 'box1')
    // } else if (cat.code === 'medium') {
    //   this.connectorService._drawLine('box1card1', this.mapping['medium']['box1card1'], {
    //     startPlug: 'disc', endPlug: 'disc', color: 'black'
    //   }, 'box0', 'box1')
    // } else if (cat.code === 'gradeLevel') {
    //   this.connectorService._drawLine('box2card7', this.mapping['grade']['box2card7'], {
    //     startPlug: 'disc', endPlug: 'disc', color: 'black'
    //   }, 'box0', 'box1')
    // }
  }
  private setClearSelection(cat: NSFramework.ICategory, term: NSFramework.ITerm) {
    // console.log(cat, term)
    const activeCategories = this.framework.filter(f => { return f.index <= cat.index + 1 })
    this.frameworkService.currentSelection.next(activeCategories)
  }
  public isActive(cat?: NSFramework.ICategory, catIdx?: number) {
    if (this.frameworkService.currentSelection.value.filter(f => { return (cat && cat.index && f.index === cat.index) || f.index === catIdx }).length >= 1) {
      return true;
    }
    return false
  }

  getPrevious(cat: NSFramework.ICategory) {
    return this.framework.filter(f => { return f.index === cat.index - 1 })[0]

  }
  getNext(cat: NSFramework.ICategory) {
    return this.framework.filter(f => { return f.index === cat.index + 1 })[0]
  }
}
