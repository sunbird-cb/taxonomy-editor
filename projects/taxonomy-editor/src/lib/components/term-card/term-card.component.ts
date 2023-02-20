import { Component, Input, OnInit } from '@angular/core'
import { NSFramework } from '../../models/framework.model'

@Component({
  selector: 'lib-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.css']
})
export class TermCardComponent implements OnInit {
  @Input() data!: NSFramework.ITermCard
  @Input() selected = false
  constructor() { }

  ngOnInit() {
  }

}
