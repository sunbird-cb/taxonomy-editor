import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { labels } from '../../labels/strings';

@Component({
  selector: 'lib-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ApprovalComponent implements OnInit {
  app_strings: any = labels;

  constructor() { }

  ngOnInit() {
  }

}
