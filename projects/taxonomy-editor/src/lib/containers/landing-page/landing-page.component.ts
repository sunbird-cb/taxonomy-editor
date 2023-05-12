import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { labels } from '../../labels/strings';

@Component({
  selector: 'lib-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  frameworkCategories: any;
  app_strings: any = labels;

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      console.log('Service...',res)
      this.frameworkCategories = res.result.framework.categories
    })
  }

}
