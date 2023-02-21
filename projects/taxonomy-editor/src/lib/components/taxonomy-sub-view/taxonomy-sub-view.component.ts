import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NSFramework } from '../../models/framework.model';
import { FrameworkService } from '../../services/framework.service';
import { ConnectorService } from '../../services/connector.service';

@Component({
  selector: 'lib-taxonomy-sub-view',
  templateUrl: './taxonomy-sub-view.component.html',
  styleUrls: ['./taxonomy-sub-view.component.css']
})
export class TaxonomySubViewComponent implements OnInit {
  @Input() cat: { category: NSFramework.ICategory, next: any }
  @Input() idx: number
  @Input() previous?: NSFramework.ICategory
  @Input() next?: NSFramework.ICategory
  @Output() clicked = new EventEmitter<any>()
  constructor(private frameworkService: FrameworkService, private connectorService: ConnectorService) {
    this.frameworkService.currentSelection.subscribe(c => {
      console.log("current==> now load next level", c)
      debugger;

    })
  }

  ngOnInit() {
    // console.log(this.cat.cat.code, this.idx, this.previous, this.next)
  }

  cardClick(event, data: NSFramework.ITermCard) {
    //  console.log(event,data)
    console.log(event.term.associations.filter(e => {
      return e.category == "gradeLevel"
    }))
    console.log(event.term.associations.filter(e => {
      return e.category == "subject"
    }))
    debugger
    const nextLevel = this.frameworkService.getNextLevel(event.term)
    // magic
    nextLevel.terms = event.term.associations.filter(e => {
      return e.category == nextLevel.code
    })
    const dataToSend: NSFramework.ISelectedCategory = {
      category: this.cat.next,
      identifier: this.cat.next.identifier,
      level: this.cat.next.index,
      next: nextLevel,

    }
    this.clicked.emit(dataToSend)
    // this.setClearSelection({}, term)
    // this.frameworkService.setSelected(this.cat.cat, term)
    // this.setClearSelection()
  }

  private setClearSelection() {
    this.frameworkService.currentSelection.next([...this.frameworkService.currentSelection.value, { cat: this.next }])
  }
  get getExisting() {
    console.log(this.next, this.cat, this.previous)
    return [...this.frameworkService.currentSelection.getValue()].filter(item => {
      return item.cat.index === this.cat.category.index
    }).length > 0
  }
  isSelected(code: string) {
    const selectedList = [...this.frameworkService.currentSelection.getValue()] || []
    if (selectedList.length === 0) {
      return false
    } else {
      const foundList = selectedList.filter(f => {
        return (f.cat && f.current) && f.cat.code === this.cat.category.code && f.current.code == code
      })
      return foundList.length > 0 ? true : false
    }
  }
}
