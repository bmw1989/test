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

declare let Q: any;
@Component({
  selector: 'app-gestion-utilisateur.component',
  templateUrl: './find-contribuable.component.html',
  styleUrls: ['./find-contribuable.component.scss'],
})

export class FindContribuableComponent implements OnInit {

  @Input() resultVO = new ResultVO();

   source: LocalDataSource = new LocalDataSource();
   settings: any;

  keys = Object.keys;
  civilites = Civilite;
  civiliteSelected= "Mr";

   personnePhy:BeanRecherchePersonnePhy = new BeanRecherchePersonnePhy();



	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService,
         private contribuableService:ContribuableService,
			   private pagerService: PagerService,
              private datePipe: DatePipe) {
    this.initTableSettings();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
      this.initTableSettings();
    });
  }


	ngOnInit() {



	}

  rechercherPersonnePhy(){

  }

  initTableSettings(): void {
    this.settings = {
      hideSubHeader: true,

      actions: {
        position: 'right', // left|right
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        username: {
          title: this.translate.instant('username'),
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
        },
        prenomFr: {
          title: 'Prénom',
          type: 'string',
        },
        libelleFr: {
          title: this.translate.instant('libelleFr'),
          type: 'string',
        },
        dateCreation: {
          title: this.translate.instant('dateCreation'),
          valuePrepareFunction: (dateCreation) => {
            return this.datePipe.transform(new Date(dateCreation), 'dd/MM/yyyy');
          },
          type: Date,
        },
        action: {
           title: this.translate.instant('Action'),
           type:'custom',

        },
      },
      pager: {
        perPage: 10,
      },attr: {
        class: 'table table-bordered',
      },
    };
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
		  window.scroll(0,0);
		}
	
	  }


}
