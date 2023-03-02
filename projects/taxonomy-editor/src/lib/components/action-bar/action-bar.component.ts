import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'lib-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
  }

  publishFramwork(){
      this.frameworkService.publishFramework().subscribe(res => {
        console.log(res)
      });
  }
}
