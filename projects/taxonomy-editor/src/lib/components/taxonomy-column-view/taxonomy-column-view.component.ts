import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NSFramework } from '../../models/framework.model';
import { FrameworkService } from '../../services/framework.service';
import { ConnectorService } from '../../services/connector.service';
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
    console.log(this.columnData)
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
        return
        // console.log("SKIP: from subscription===>", "FOR " + this.category, e)
      } else {
        debugger
        const next = this.frameworkService.getNextCategory(e.type)
        // console.log("ADD: from subscription===>", "FOR " + this.category, next, this.children)
        if (next.code === this.column.code) {
          console.log('matched===========>', this.column.code)
          this.columnData = e.data.children
            .filter(x => {
              return x.category == this.column.code
            }).map(mer => {
              mer.children = [...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift()
              return mer
            })

          console.log(this.columnData)
        }
        if (next.index < this.column.index) {
          this.columnData = []
        }
      }
    })
  }
  ngOnDestroy(): void {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
  }
}