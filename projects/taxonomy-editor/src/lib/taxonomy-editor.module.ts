import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeComponent } from './ng-tree-diagram/tree.component';
import { TaxonomyEditorComponent } from './taxonomy-editor.component';
import { MatIconModule } from '@angular/material/icon'
import { NodesListService } from './ng-tree-diagram/services/nodes-list.service';
import { NodeComponent } from './ng-tree-diagram/node/node.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    TaxonomyEditorComponent,
    TreeComponent,
    NodeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ],
  exports: [
    TaxonomyEditorComponent,
    TreeComponent,
    NodeComponent
  ],
  providers: [
    NodesListService,
  ]
})
export class TaxonomyEditorModule { }
