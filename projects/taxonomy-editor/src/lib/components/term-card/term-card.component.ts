import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core'
import { NSFramework } from '../../models/framework.model'
import { ApprovalService } from '../../services/approval.service';
import { FrameworkService } from '../../services/framework.service'
import { LocalConnectionService } from '../../services/local-connection.service';
import { labels } from '../../labels/strings';
import { CardSelection, CardChecked, Card } from '../../models/variable-type.model';

@Component({
  selector: 'lib-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.scss']
})
export class TermCardComponent implements OnInit {
  // @Input() data!: NSFramework.ITermCard

  private _data: NSFramework.ITermCard;
  isApprovalRequired: boolean = false
  approvalList: Array<Card> = [];
  app_strings: any = labels;
  @Input()
  set data(value: any) {
    this._data = value;
    //  if(this._data)
    //    this.createTimeline(this._data[0].id)
    this._data.children.highlight=false
  }
  get data(): any {
    return this._data;
  }

  @Output() isSelected = new EventEmitter<CardSelection>()
  @Output() selectedCard = new EventEmitter<CardChecked>()

  constructor(private frameworkService: FrameworkService, private localConnectionService: LocalConnectionService, private approvalService: ApprovalService) { }

  ngOnInit() {
    this.isApprovalRequired = this.localConnectionService.getConfigInfo().isApprovalRequired
    // console.log(this._data)
    this.updateApprovalStatus()
  }

  cardClicked(data: any, cardRef: any) {
    // this.data.selected = true
    if(this.frameworkService.isLastColumn(this.data.category)){
      return 
    }
    this.isSelected.emit({ element: this.data.children, isSelected: !data.selected })
    this.frameworkService.currentSelection.next({ type: this.data.category, data: data.children, cardRef })
  }

  handleProductClick(term, event){
    this.selectedCard.emit({term:term, checked:event.checked})
  }

  updateApprovalStatus(){
     const id = this._data.children.identifier;
    this.approvalService.getUpdateList().subscribe((list:any) => {
      this.approvalList = list.map(item => item.identifier);
      if(this.approvalList){
           if(this.approvalList.includes(id)){
              this._data.children.highlight = true
            }
      }     
    })
  }

  getColor(indexClass:number, cardRef: any,property: string, data:any) {
    let config = this.frameworkService.getConfig(data.category);
    if(cardRef.classList.contains('selected') && property === 'bgColor'){
       return config.color;
    }
    if(property === 'border'){
      let borderColor;
      if(cardRef.classList.contains((indexClass).toString())){
        borderColor = "8px solid" + config.color;
      }
      return borderColor;
    }
  }
}
