import { Component, OnInit, Input } from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { Contribuable } from '../model/contribuable';
import { ResultVO } from '../../../model/commun/vo/ResultVO';
import { AuthenticationService } from '../../../views/loginRoot/service/authenticationService';
import { PersonnePhysique } from '../model/personne-physique';
import { TypeActivite } from '../model/type-activite';
import {Utilisateur} from "../../../model/utilisateur/Utilisateur";
import {ActiviteService} from "../service/activite.services";
import {FicheActivite} from "../model/fiche-activite";
import {LocalDataSource} from "ng2-smart-table";



@Component({
  selector: 'app-fiche-contribuable.component',
  templateUrl: './fiche-contribuable.component.html',
  styleUrls: ['./fiche-contribuable.component.scss'],
})

export class FicheContribuableComponent implements OnInit {

    @Input() resultVO: ResultVO;
    @Input() newContribuable: PersonnePhysique;
    activitePrincipalSelected:TypeActivite;
    activiteSelected:TypeActivite;
    listTypeActPrincipale: TypeActivite[];
    listActivitesChoisies: TypeActivite[];
    source: LocalDataSource = new LocalDataSource();
    settings: any;

    constructor(private authServiceApp: AuthenticationService,
                private activiteService:ActiviteService,
                public translate: TranslateService) {
      this.initTableSettings();
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translate.use(event.lang);
        this.initTableSettings();
      });
    }
    ngOnInit() {
      this.newContribuable = new PersonnePhysique();
      this.getListTypeActivitePrincipal();
      this.listActivitesChoisies = [];
	  }

	  ajouterActivite(){

      this.activiteSelected.refTypeActivite = this.activitePrincipalSelected.libelleFr;
      this.listActivitesChoisies.push(this.activiteSelected);
      this.source.load(this.listActivitesChoisies);


    }
    changeActivitePrincipal(typeActPrincipale){
      this.activitePrincipalSelected = typeActPrincipale;
    }

	  private getListTypeActivitePrincipal(){
      this.activiteService.getAllMenu().then(resultat => {
        if (resultat) {
          this.listTypeActPrincipale = resultat.data as TypeActivite[];
        }
      }, (error => {
        if (error) {
          this.resultVO.data = error.data;
          this.resultVO.messagesErrors = error.messagesErrors;
          this.resultVO.messagesInfo = error.messagesInfo;
        }
        //this.initializeResultVO();
        if (this.resultVO.isDeconnected) {
          this.authServiceApp.logoutWithParam();
        }
      }));
    }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.listActivitesChoisies = this.listActivitesChoisies.filter(obj => obj!==event.data);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  initTableSettings(): void {
    this.settings = {
      hideSubHeader: true,
      actions: {
        position: 'right', // left|right
        add: false,
        edit: false,
      },
      columns: {
        refTypeActivite: {
          title: this.translate.instant('activite principal'),
          type: 'string',
        },
        libelleFr: {
          title: this.translate.instant('activite'),
          type: 'string',
        },
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      pager: {
        perPage: 3,
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
