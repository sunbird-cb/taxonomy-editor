import { NgModule } from '@angular/core';
import { TaxonomyEditorComponent } from './taxonomy-editor.component';
import { CreateLevelsComponent } from './create-levels/create-levels.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [TaxonomyEditorComponent, CreateLevelsComponent],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [TaxonomyEditorComponent, CreateLevelsComponent]
})
export class TaxonomyEditorModule { }
