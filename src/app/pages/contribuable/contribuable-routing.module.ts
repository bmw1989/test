import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FicheContribuableComponent } from './fiche-contribuable/fiche-contribuable.component';
import {FindContribuableComponent} from "./find-contribuable/find-contribuable.component";


const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Contribuable',
      },
      children: [
        {
          path: '',
          redirectTo: 'fichecontribuable',
        },
        {
          path: 'fichecontribuable',
          component: FicheContribuableComponent,
          data: {
            title: 'Fiche contribuable',
          },
        },
        {
          path: 'findcontribuable',
          component: FindContribuableComponent,
          data: {
            title: 'Find contribuable',
          },
        },
      ],
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContribuableRoutingModule { }
