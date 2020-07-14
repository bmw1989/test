import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    
    { path: 'administration', loadChildren : () => import('./administration/administration.module').then(m => m.AdministrationModule)},
    { path: 'contribuable', loadChildren : () => import('./contribuable/contribuable.module').then(m => m.ContribuableModule)},
    { path: 'grc-components', loadChildren : () => import('./grc-components/grc-components.module').then(m => m.GRCComponentsModule)},

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
