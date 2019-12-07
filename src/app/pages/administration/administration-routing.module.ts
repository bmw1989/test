import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionutilisateurComponent } from './gestionutilisateur/gestion-utilisateur.component';
import { GestionProfilComponent } from './gestionprofil/gestion-profil.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administration'
    },
    children: [
      {
        path: '',
        redirectTo: 'gestusers'
      },
      {
        path: 'gestusers',
        component: GestionutilisateurComponent,
        data: {
          title: 'Gestion des utilisateurs'
        }
      },
      {
          path: 'gestprofiles',
          component: GestionProfilComponent,
          data: {
              title: 'Gestion des profiles'
          }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
