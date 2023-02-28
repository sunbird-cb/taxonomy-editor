import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TaxonomyEditorComponent } from './taxonomy-editor.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { TaxonomyEditorRoutingModule } from './taxonomy-editor-routing.module'

import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule, MatSelect, MatSelectModule } from '@angular/material'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { DashboardComponent } from './containers/dashboard/dashboard.component'
import { FrameworkService } from './services/framework.service'
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component'
import { ConfigFrameworkComponent } from './containers/config-framework/config-framework.component'
import { TaxonomyViewComponent } from './components/taxonomy-view/taxonomy-view.component'
import { TermCardComponent } from './components/term-card/term-card.component'
import { CommonModule } from '@angular/common';
import { CategoriesPreviewComponent } from './components/categories-preview/categories-preview.component'
import { ConnectorService } from './services/connector.service'
import { CreateTermComponent } from './components/create-term/create-term.component';
import { TaxonomyColumnViewComponent } from './components/taxonomy-column-view/taxonomy-column-view.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { TokenInterceptorService } from './services/token-interceptor.service'
import { ConnectorComponent } from './components/connector/connector.component'
import { IConnection } from './models/connection.model'
import { LocalConnectionService } from './services/local-connection.service'
import { ENVIRONMENT } from './services/connection.service'
// export const LIB_OPTIONS = new InjectionToken<IConnection>('env')
@NgModule({
  declarations: [
    TaxonomyEditorComponent,
    DashboardComponent,
    ConfigFrameworkComponent,
    CreateCategoriesComponent,
    ConfigFrameworkComponent,
    TaxonomyViewComponent,
    TermCardComponent,
    TaxonomyColumnViewComponent,
    CategoriesPreviewComponent,
    CategoriesPreviewComponent,
    CreateTermComponent,
    ConnectorComponent,
  ],
  imports: [
    BrowserModule,
    TaxonomyEditorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    DragDropModule,
    MatAutocompleteModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    FrameworkService,
    ConnectorService,
    LocalConnectionService,
  ],
  exports: [
    TaxonomyEditorComponent,
    CreateCategoriesComponent,
    ConfigFrameworkComponent,
    TaxonomyViewComponent,
    TermCardComponent,
    CategoriesPreviewComponent
  ],
  entryComponents: [
    CreateTermComponent,
    ConnectorComponent,
  ]
})
export class TaxonomyEditorModule {
  static forRoot(config: IConnection): ModuleWithProviders {
    return {
      ngModule: TaxonomyEditorModule,
      providers: [
        // LocalConnectionService,
        {
          provide: ENVIRONMENT,
          useValue: config
        }
      ]
    };
  }
}
