import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FicheContribuableComponent } from './fiche-contribuable/fiche-contribuable.component';
import {FindContribuableComponent} from "./find-contribuable/find-contribuable.component";
import {FicheContribuableMComponent} from "./fiche-contribuable-m/fiche-contribuable-m.component";


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
          path: 'ajoutcontribuable/:type',
          component: FicheContribuableComponent,
          data: {
            title: 'Fiche contribuable',
          },
        },
        {
          path: 'persmorale',
          component: FicheContribuableMComponent,
          data: {
            title: 'Personne Morale',
          },
        },
        {
          path: 'findcontribuable',
          component: FindContribuableComponent,
          data: {
            title: 'Find contribuable',
          },
        },
        {
          path: 'editcontribuable/:nni',
          component: FicheContribuableComponent,
          data: {
            title: 'Edit contribuable',
          },
        },
      ],
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContribuableRoutingModule { }
