import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { TaxonomyEditorComponent } from './taxonomy-editor.component';
import { CreateLevelsComponent } from './shared/components/create-levels/create-levels.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxonomyEditorRoutingModule } from './taxonomy-editor-routing.module';

import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material'

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';

@NgModule({
  declarations: [
    TaxonomyEditorComponent,
    CreateLevelsComponent,
    DashboardComponent,
    LandingPageComponent
    ],
  imports: [
    BrowserModule,
    TaxonomyEditorRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  providers:[
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  exports: [TaxonomyEditorComponent, CreateLevelsComponent]
})
export class TaxonomyEditorModule { }
