import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FicheContribuableComponent } from './fiche-contribuable/fiche-contribuable.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ContribuableRoutingModule } from './contribuable-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


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
    ThemeModule,
    FormsModule,
    TranslateModule,
    ContribuableRoutingModule
  ]
})
export class ContribuableModule { }
