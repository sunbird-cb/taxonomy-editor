import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-taxonomy-column-view',
  templateUrl: './taxonomy-column-view.component.html',
  styleUrls: ['./taxonomy-column-view.component.css']
})
export class TaxonomyColumnViewComponent implements OnInit, OnDestroy {
  @Input() column: any
  columnData = []
  childSubscription: Subscription = null
  constructor(private frameworkService: FrameworkService) {
  }

  ngOnInit(): void {
    this.subscribeEvents()
    if (this.column.index === 1) {
      this.columnData = this.column.children
    }
  }
  subscribeEvents() {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
    this.childSubscription = this.frameworkService.currentSelection.subscribe(e => {
      if (!e) {
        return
      } else if (e.type === this.column.code) {
        // set selected
        // this.column.selected = true
        return
        // console.log("SKIP: from subscription===>", "FOR " + this.category, e)
      } else {
        const next = this.frameworkService.getNextCategory(e.type)
        // console.log("ADD: from subscription===>", "FOR " + this.category, next, this.children)
        if (next && next.code === this.column.code) {
          // console.log('matched===========>', this.column.code)
          this.columnData = (e.data.children || [])
            .filter(x => {
              return x.category == this.column.code
            }).map(mer => {
              mer.selected = true
              mer.children = [...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift()
              return mer
            })

          // console.log(this.columnData)
        }
        if (next && next.index < this.column.index) {
          this.columnData = []
        }
      }
    })
  }
  selected(selection: any) {
    // console.log(selection.element.code, selection.isSelected)
    this.column.children.map(col => {
      if (col.code === selection.element.code) {
        col.selected = true
      } else {
        col.selected = false
      }
    })
  }
  get columnItems() {
    // const selected = this.column.children.filter(f => { return f.selected })
    // if (selected.length > 0) {
    //   const data= this.columnData.map(cd => {
    //     cd.selected = this.column.children.filter(f => { return cd.code === f.code }).map(s => s.selected)[0]
    //     return cd
    //   })
    //   return data
    // } else {
      return this.columnData
    // }
  }
  ngOnDestroy(): void {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
  }
}