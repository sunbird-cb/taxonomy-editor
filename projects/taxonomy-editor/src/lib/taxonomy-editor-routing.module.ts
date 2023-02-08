import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './containers/dashboard/dashboard.component'
import { LandingPageComponent } from './containers/landing-page/landing-page.component'

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent,
    },
    {
        path:'home', component:LandingPageComponent
    },
    {
        path:'dashboard', component:DashboardComponent
    }
]
@NgModule({
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
    providers: [],
  })
  export class TaxonomyEditorRoutingModule { }
  