import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from 'app/pages/loginRoot/service/authenticationService';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { PagerService } from 'app/views/pagination-example/pager.service';
import {LocalDataSource} from "ng2-smart-table";
import {DatePipe} from "@angular/common";

import {BeanRecherchePersonnePhy} from "../model/criteria/beanRecherchePersonnePhy";
import PersonnePhysique from "../model/personne-physique";
import {ContribuableService} from "../service/contribuable.service";
import {Civilite} from "../../../model/referentiel/civilite";
import {LinkeditViewComponent} from "./linkedit-view/linkedit-view.component";
import {Router} from "@angular/router";
import {BeanRecherchePersonneMorale} from "../model/criteria/beanRecherchePersonneMorale";
import {PersonneMorale} from "../model/personne-morale";

declare let Q: any;
@Component({
  selector: 'app-gestion-utilisateur.component',
  templateUrl: './find-contribuable.component.html',
  styleUrls: ['./find-contribuable.component.scss'],
})

export class FindContribuableComponent implements OnInit {

  @Input() resultVO = new ResultVO();
  @ViewChild('criteresrech', { static: true }) accordion;

  sourcePers: LocalDataSource = new LocalDataSource();
   settings: any;
   settingsMo:any;

   keys = Object.keys;
   civilites = Civilite;

   personnePhy:BeanRecherchePersonnePhy = new BeanRecherchePersonnePhy();
   personneMorale:BeanRecherchePersonneMorale = new BeanRecherchePersonneMorale();

   listePersonnes;
   personneSelected;
   typePersonne:string;
   modeFicheContribuable;

	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService,
         private contribuableService:ContribuableService,
              private router: Router,
              private datePipe: DatePipe) {
      this.initTableSettings();
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
      this.initTableSettings();
    });
  }


	ngOnInit() {

    this.personneSelected = null;


    this.accordion.toggle();
	}


  rechercherPersonneMorale(){

    this.personneSelected = null;
    this.typePersonne = 'M';
    this.contribuableService.getListPersonneMorale(this.personneMorale).then(resultat => {
      if (resultat) {
        this.resultVO = new ResultVO();
        this.listePersonnes = resultat.data as PersonneMorale[];
        if(this.listePersonnes == null || this.listePersonnes.length === 0){

          const message = this.translate.instant('MSG.CONTRIBUABLE.INFO.MSG_INFO_CONT_001');
          this.resultVO.messagesInfo = [message];
          this.initializeResultVO();
        }else{
          this.accordion.close();
        }

        this.sourcePers.load(this.listePersonnes );

      }
    }, (error => {
      if (error) {
        this.resultVO.data = error.data;
        this.resultVO.messagesErrors = error.messagesErrors;
        this.resultVO.messagesInfo = error.messagesInfo;
      }
      this.initializeResultVO();
      if (this.resultVO.isDeconnected) {
        this.authServiceApp.logoutWithParam();
      }

    }));
  }

  rechercherPersonnePhy(){

    this.personneSelected = null;
    this.typePersonne = 'P';
    this.contribuableService.getListPersonnePhy(this.personnePhy).then(resultat => {
      if (resultat) {
        this.resultVO = new ResultVO();
        this.listePersonnes = resultat.data as PersonnePhysique[];
        if(this.listePersonnes  == null || this.listePersonnes.length === 0){

          const message = this.translate.instant('MSG.CONTRIBUABLE.INFO.MSG_INFO_CONT_001');
          this.resultVO.messagesInfo = [message];
          this.initializeResultVO();
        }else{
          this.accordion.close();
        }

        this.sourcePers.load(this.listePersonnes );

      }
    }, (error => {
      if (error) {
        this.resultVO.data = error.data;
        this.resultVO.messagesErrors = error.messagesErrors;
        this.resultVO.messagesInfo = error.messagesInfo;
      }
      this.initializeResultVO();
      if (this.resultVO.isDeconnected) {
        this.authServiceApp.logoutWithParam();
      }

    }));
  }

  onCustomAction(event){
    this.openComponentContribuable(event.data);

    this.modeFicheContribuable = 'MODIF';
  }

  initTableSettings(): void {
    this.settings = {
      hideSubHeader: true,

      actions: {
        position: 'right', // left|right
        add: false,
        edit: false,
        delete: false,
        custom: [{ name: 'ourCustomAction', title: '<i style="margin-top: 10%;font-size: 0.73em; "  class="nb-compose" ></i>' }],
      },
      columns: {
        nni: {
          title: this.translate.instant('NNI'),
          type: 'string',
          sort:true,
        },
        nomAr: {
          title: 'النسب',
          type: 'string',
          sort:true,
        },
        prenomAr: {
          title: 'الإ سم',
          type: 'string',
          sort:true,
        },
        nomFr: {
          title: 'Nom',
          type: 'string',
          sort:true,
        },
        prenomFr: {
          title: 'Prénom',
          type: 'string',
          sort:true,
        },
        adresse: {
          title: this.translate.instant('adresse'),
          type: 'string',
          sort:true,
        },
        taxe: {
          title: this.translate.instant('taxe'),
          type: 'number',
          sort:true,
        },

      },
      pager: {
        perPage: 5,
      },attr: {
        class: 'table table-bordered',
      },
    };


    this.settingsMo = {
      hideSubHeader: true,

      actions: {
        position: 'right', // left|right
        add: false,
        edit: false,
        delete: false,
        custom: [{ name: 'ourCustomAction', title: '<i style="margin-top: 10%;font-size: 0.73em; "  class="nb-compose" ></i>' }],
      },
      columns: {
        nomSociete: {
          title: this.translate.instant('societe'),
          type: 'string',
          sort:true,
        },
        numRegistreCommerce: {
          title: this.translate.instant('numRegistreCommerce'),
          type: 'string',
          sort:true,
        },
        dateCreationSociete: {
          title: this.translate.instant('dateCreation'),
          valuePrepareFunction: (dateCreationSociete) => {
            return this.datePipe.transform(new Date(dateCreationSociete), 'dd/MM/yyyy');
          },
          type: Date,
          sort:true,
        },
        adresse: {
          title: this.translate.instant('adresse'),
          type: 'string',
          sort:true,
        },
        taxe: {
          title: this.translate.instant('taxe'),
          type: 'number',
          sort:true,
        },

      },
      pager: {
        perPage: 5,
      },attr: {
        class: 'table table-bordered',
      },
    };
  }

  onRowSelect(event){

	  this.openComponentContribuable(event.data);
	  this.modeFicheContribuable = 'CONSULTATION';
  }

  openComponentContribuable(contribuable){

    this.personneSelected = contribuable;

    this.listePersonnes = [];
    this.sourcePers.load(this.listePersonnes );

    this.accordion.close();

  }

	initializeResultVO () {
		if (this.resultVO == null) {
		  this.resultVO = new ResultVO ();
		}
		if (this.resultVO.messagesErrors == null) {
		  this.resultVO.messagesErrors = [];
		}
		if (this.resultVO.messagesInfo == null) {
		  this.resultVO.messagesInfo = [];
		}
    if (this.resultVO.messagesInfo.length > 0 || this.resultVO.messagesErrors.length > 0) {
      window.scroll(0, 0);
    }
	}


}
