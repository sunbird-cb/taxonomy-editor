import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'lib-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  @Input() actionType;
  @Input() configType;
  @Output() sendApproval = new EventEmitter()
  @Output() closeAction = new EventEmitter()
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
  }

  SendForApproval(){
      this.sendApproval.emit('')
  }

  closeActionBar(){
    this.closeAction.emit('')
  }
  getApproveLevelText(res){
    if(!res) { return }
    return `Approve ${res.substr(res.lastIndexOf('_')+1,res.length)}`
  }
}
