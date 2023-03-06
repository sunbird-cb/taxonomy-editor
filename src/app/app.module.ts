import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { TaxonomyEditorModule } from 'taxonomy-editor'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatButtonModule } from '@angular/material/button'
import { AppRoutingModule } from './app-routing.module'
import { environment } from 'src/environments/environment'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaxonomyEditorModule.forRoot({
      source: 'online', data:
        { endpoint: environment.url, token: environment.token, frameworkName: 'devmvp1' }
    }),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
