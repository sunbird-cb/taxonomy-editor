import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../shared/services/framework.service';

@Component({
  selector: 'lib-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      console.log('Service...',res)
    })
  }

}
