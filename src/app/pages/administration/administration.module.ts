import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { GestionutilisateurComponent } from './gestionutilisateur/gestion-utilisateur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { SortablejsModule} from "ngx-sortablejs";
import { GestionProfilComponent } from './gestionprofil/gestion-profil.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule, NbSelectModule, NbTabsetModule,
} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {StatutViewComponent} from "./gestionutilisateur/statut-view/statut-view.component";
import {StatutprofilViewComponent} from "./gestionprofil/statutprofil-view/statutprofil-view.component";


@NgModule({
  declarations: [
    GestionutilisateurComponent,
    GestionProfilComponent,
    StatutViewComponent,
    StatutprofilViewComponent,
  ],
  imports: [
    CommonModule,
		FormsModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbTabsetModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
		ReactiveFormsModule,
    TranslateModule,
    ModalModule.forRoot(),
    AdministrationRoutingModule,
    SortablejsModule,
    TabsModule,
  ],
  entryComponents :[
    GestionutilisateurComponent,
    StatutViewComponent,
    StatutprofilViewComponent,
  ],
})
export class AdministrationModule { }
