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
  NbSelectModule, NbAccordionModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ContribuableRoutingModule } from './contribuable-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {AgmCoreModule} from "@agm/core";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {GRCComponentsModule} from "../grc-components/grc-components.module";
import {FindContribuableComponent} from "./find-contribuable/find-contribuable.component";
import {LinkeditViewComponent} from "./find-contribuable/linkedit-view/linkedit-view.component";

@NgModule({
  declarations: [FicheContribuableComponent, FindContribuableComponent, LinkeditViewComponent],
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
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCMGihUtvX9zWMbvorK2yr7B17344_BtDs',
      libraries: ['places'],
    }),
    LeafletModule.forRoot(),
    ContribuableRoutingModule,
    GRCComponentsModule,
    NbAccordionModule,
  ],
  entryComponents :[LinkeditViewComponent],
})
export class ContribuableModule { }
