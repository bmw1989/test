import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContribuableRoutingModule } from './contribuable-routing.module';
import { FicheContribuableComponent } from './fiche-contribuable/fiche-contribuable.component';


@NgModule({
  declarations: [FicheContribuableComponent],
  imports: [
    CommonModule,
    ContribuableRoutingModule
  ]
})
export class ContribuableModule { }
