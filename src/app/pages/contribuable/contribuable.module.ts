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
  NbSelectModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ContribuableRoutingModule } from './contribuable-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [FicheContribuableComponent],
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
    ContribuableRoutingModule,
  ],
})
export class ContribuableModule { }
