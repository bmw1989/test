import {Component, Input, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ResultVO} from '../../../model/commun/vo/ResultVO';
import {AuthenticationService} from '../../loginRoot/service/authenticationService';
import {TypeActivite} from '../model/type-activite';
import {ActiviteService} from "../service/activite.services";
import {FicheActivite} from "../model/fiche-activite";
import {LocalDataSource} from "ng2-smart-table";
import {Civilite} from "../../../model/referentiel/civilite";
import PersonnePhysique from "../model/personne-physique";
import {ContribuableService} from '../service/contribuable.service';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import {IPaging} from "../../../model/design/IPaging";
import {BeanRecherchePersonnePhy} from "../model/criteria/beanRecherchePersonnePhy";
import {PersonneMorale} from "../model/personne-morale";

@Component({
  selector: 'app-fiche-contribuable-m',
  templateUrl: './fiche-contribuable-m.component.html',
  styleUrls: ['./fiche-contribuable-m.component.scss'],
})

export class FicheContribuableMComponent implements OnInit {




    constructor() {


    }

    ngOnInit() {


    }





}
