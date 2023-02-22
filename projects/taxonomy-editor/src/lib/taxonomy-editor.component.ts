import { Component, Input, OnInit } from '@angular/core';
import { FrameworkService } from './services/framework.service';

@Component({
  selector: 'lib-taxonomy-editor',
  template: `
    <router-outlet></router-outlet>
   `,
  styles: []
})
export class TaxonomyEditorComponent implements OnInit {
  @Input() environment;
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.updateEnvironment(this.environment)
  }

}
