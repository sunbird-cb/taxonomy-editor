import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { TaxonomyEditorModule } from 'taxonomy-editor'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {MatButtonModule} from '@angular/material/button'
import { AppRoutingModule } from './app-routing.module'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaxonomyEditorModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
