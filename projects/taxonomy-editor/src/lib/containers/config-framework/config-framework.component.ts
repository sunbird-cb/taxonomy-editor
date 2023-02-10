import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'lib-config-framework',
  templateUrl: './config-framework.component.html',
  styleUrls: ['./config-framework.component.scss']
})
export class ConfigFrameworkComponent implements OnInit {
  frameworkCategories;

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      this.frameworkCategories = res.result.framework.categories
    })
  }

}
