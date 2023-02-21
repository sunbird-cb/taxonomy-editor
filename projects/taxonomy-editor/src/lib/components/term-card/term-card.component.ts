import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NSFramework } from '../../models/framework.model'

@Component({
  selector: 'lib-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.css']
})
export class TermCardComponent implements OnInit {
  @Input() data!: NSFramework.ITermCard
  @Output() clicked = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
    // console.log(this.data)
  }

  cardClicked($event) {
    debugger
    this.clicked.emit({...this.data,$event})
  }
}
