import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FicheContribuableComponent } from './fiche-contribuable/fiche-contribuable.component';
import {
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbTabsetModule,
  NbSelectModule, NbAccordionModule, NbStepperModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ContribuableRoutingModule } from './contribuable-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {GRCComponentsModule} from "../grc-components/grc-components.module";
import {FindContribuableComponent} from "./find-contribuable/find-contribuable.component";
import {LinkeditViewComponent} from "./find-contribuable/linkedit-view/linkedit-view.component";
import {FicheContribuableMComponent} from "./fiche-contribuable-m/fiche-contribuable-m.component";
import {NbMomentDateModule} from "@nebular/moment";

@NgModule({
  declarations: [FicheContribuableComponent,
    FindContribuableComponent,
    FicheContribuableMComponent,
    LinkeditViewComponent],
  imports: [
    CommonModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbTabsetModule,
    NbSelectModule,
    Ng2SmartTableModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    TranslateModule,
    LeafletModule.forRoot(),
    ContribuableRoutingModule,
    GRCComponentsModule,
    NbAccordionModule,
    NbMomentDateModule,
    NbStepperModule,
  ],
  entryComponents :[LinkeditViewComponent],
})
export class ContribuableModule { }
