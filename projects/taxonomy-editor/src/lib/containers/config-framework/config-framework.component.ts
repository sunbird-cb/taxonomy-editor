import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { categoryRepresentations } from '../../constants/data'
@Component({
  selector: 'lib-config-framework',
  templateUrl: './config-framework.component.html',
  styleUrls: ['./config-framework.component.scss']
})
export class ConfigFrameworkComponent implements OnInit {
  frameworkCategories;
  categoriesRepresentations = [];
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      console.log('Service...',res)
      this.frameworkCategories = res.result.framework.categories
    })
    this.categoriesRepresentations = categoryRepresentations
  }

}
