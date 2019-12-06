import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './views/loginRoot/login.component';

const routes: Routes = [

  {
    path: 'pages',
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Page de connexion'
    }
  },
  {
    path: 'logout',
    component: LoginComponent,
    data: {
      title: 'Déconnexion'
    }
  },
 
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      { path: 'notifications', loadChildren : () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)},
      { path: 'administration', loadChildren : () => import('./views/administration/administration.module').then(m => m.AdministrationModule)},
      { path: 'grc-components', loadChildren : () => import('./views/grc-components/grc-components.module').then(m => m.GRCComponentsModule)},
      { path: 'contribuable', loadChildren : () => import('./views/contribuable/contribuable.module').then(m => m.ContribuableModule)},
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
