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

declare let Q: any;
@Component({
  selector: 'app-gestion-utilisateur.component',
  templateUrl: './find-contribuable.component.html',
  styleUrls: ['./find-contribuable.component.scss'],
})

export class FindContribuableComponent implements OnInit {

  @Input() resultVO = new ResultVO();
  @ViewChild('criteresrech', { static: true }) accordion;

  sourcePersPhy: LocalDataSource = new LocalDataSource();
  sourcePersMo: LocalDataSource = new LocalDataSource();
   settings: any;

   keys = Object.keys;
   civilites = Civilite;
   civiliteSelected= "Mr";

   personnePhy:BeanRecherchePersonnePhy = new BeanRecherchePersonnePhy();
   listePersonnesPhy:PersonnePhysique[];
   personnePhySelected:PersonnePhysique;
   modeFicheContribuable;

	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService,
         private contribuableService:ContribuableService,
              private router: Router  ) {
    this.initTableSettings();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
      this.initTableSettings();
    });
  }


	ngOnInit() {
    this.personnePhySelected = null;
    this.accordion.toggle();
	}

  rechercherPersonnePhy(){

    this.personnePhySelected = null;
    this.contribuableService.getListPersonnePhy(this.personnePhy).then(resultat => {
      if (resultat) {
        this.resultVO = new ResultVO();
        this.listePersonnesPhy = resultat.data as PersonnePhysique[];
        if(this.listePersonnesPhy  == null || this.listePersonnesPhy .length === 0){

          const message = this.translate.instant('MSG.CONTRIBUABLE.INFO.MSG_INFO_CONT_001');
          this.resultVO.messagesInfo = [message];
          this.initializeResultVO();
        }else{
          this.accordion.close();
        }

        this.sourcePersPhy.load(this.listePersonnesPhy );


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
        custom: [{ name: 'ourCustomAction', title: '<i class="ion-edit"></i>' }],
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
  }

  onRowSelect(event){

	  this.openComponentContribuable(event.data);
	  this.modeFicheContribuable = 'CONSULTATION';
  }

  openComponentContribuable(contribuable){

    this.personnePhySelected = contribuable;

    this.listePersonnesPhy = [];
    this.sourcePersPhy.load(this.listePersonnesPhy );

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
