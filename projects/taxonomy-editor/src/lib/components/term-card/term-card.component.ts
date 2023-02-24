import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NSFramework } from '../../models/framework.model'
import { FrameworkService } from '../../services/framework.service'

@Component({
  selector: 'lib-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.css']
})
export class TermCardComponent implements OnInit {
  @Input() data!: NSFramework.ITermCard
  @Output() isSelected = new EventEmitter<any>()
  constructor(private frameworkService: FrameworkService) { }
 

  ngOnInit() {
    // console.log(this.data)
  }

  cardClicked(data: any, cardRef: any) {
    // this.data.selected = true
    this.isSelected.emit({ element: this.data.children, isSelected: !data.selected })
    this.frameworkService.currentSelection.next({ type: this.data.category, data: data.children , cardRef})
  }

}
