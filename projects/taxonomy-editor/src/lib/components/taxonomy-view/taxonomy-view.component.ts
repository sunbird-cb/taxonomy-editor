import { Component, Input, OnInit } from '@angular/core';
import { NSFramework } from '../../models/framework.model';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.css']
})
export class TaxonomyViewComponent implements OnInit {
  @Input() frameworkData: any
  framework
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      this.framework = res.result.framework.categories
    })
  }
  

}
