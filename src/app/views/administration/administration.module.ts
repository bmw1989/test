import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { GestionutilisateurComponent } from './gestionutilisateur/gestion-utilisateur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { SortablejsModule, SortablejsOptions} from "ngx-sortablejs";
import { GestionProfilComponent } from './gestionprofil/gestion-profil.component';


@NgModule({
  declarations: [
    GestionutilisateurComponent,
    GestionProfilComponent
  ],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
    TranslateModule,
    ModalModule.forRoot(),
    AdministrationRoutingModule,
    SortablejsModule,
    TabsModule
  ]
})
export class AdministrationModule { }
