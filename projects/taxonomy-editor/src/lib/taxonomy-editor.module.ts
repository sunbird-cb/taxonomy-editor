import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { TaxonomyEditorComponent } from './taxonomy-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxonomyEditorRoutingModule } from './taxonomy-editor-routing.module';

import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material'
import {MatIconModule} from '@angular/material/icon';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { FrameworkService } from './services/framework.service';
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component';
import { ConfigFrameworkComponent } from './containers/config-framework/config-framework.component';

@NgModule({
  declarations: [
    TaxonomyEditorComponent,
    DashboardComponent,
    ConfigFrameworkComponent,
    CreateCategoriesComponent,
    ConfigFrameworkComponent
    ],
  imports: [
    BrowserModule,
    TaxonomyEditorRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  providers:[
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    FrameworkService
  ],
  exports: [TaxonomyEditorComponent, CreateCategoriesComponent, ConfigFrameworkComponent]
})
export class TaxonomyEditorModule { }
