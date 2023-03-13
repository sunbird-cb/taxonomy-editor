import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'lib-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  @Output() sendApproval = new EventEmitter()
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
  }

  // publishFramwork(){
  //     this.frameworkService.publishFramework().subscribe(res => {
  //       console.log(res)
  //     });
  // }
  SendForApproval(){
      this.sendApproval.emit('')
  }
}
