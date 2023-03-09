import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NSFramework } from '../../models/framework.model'
import { FrameworkService } from '../../services/framework.service'

@Component({
  selector: 'lib-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.css']
})
export class TermCardComponent implements OnInit {
  // @Input() data!: NSFramework.ITermCard

  private _data: NSFramework.ITermCard;

  @Input()
  set data(value: any) {
    this._data = value;
    //  if(this._data)
    //    this.createTimeline(this._data[0].id)
  }
  get data(): any {
    return this._data;
  }

  @Output() isSelected = new EventEmitter<any>()
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    // console.log(this._data)
  }

  cardClicked(data: any, cardRef: any) {
    // this.data.selected = true
    if(this.frameworkService.isLastColumn(this.data.category)){
      return 
    }
    this.isSelected.emit({ element: this.data.children, isSelected: !data.selected })
    this.frameworkService.currentSelection.next({ type: this.data.category, data: data.children, cardRef })
  }

}
