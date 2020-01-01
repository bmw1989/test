import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { Utilisateur } from 'app/model/utilisateur/Utilisateur';
import { AuthenticationService } from 'app/views/loginRoot/service/authenticationService';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { AdministrationService } from '../administration.service';
import { Profil } from 'app/model/utilisateur/Profil';
import { PagerService } from 'app/views/pagination-example/pager.service';
import {BeanRechercheUtilisateur} from '../model/beanRechercheUtilisateur';
import {LocalDataSource} from "ng2-smart-table";
import {date} from "ng2-validation/dist/date";
import {DatePipe} from "@angular/common";
import {StatutViewComponent} from "./statut-view/statut-view.component";
import {ModalDirective} from "ngx-bootstrap";

declare let Q: any;
@Component({
  selector: 'app-gestion-utilisateur.component',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.scss'],
})

export class GestionutilisateurComponent implements OnInit {

	@Input() resultVO: ResultVO;

  @ViewChild('ajouterModal', {static: false}) ajouterModal:ModalDirective;

	//public ajouterModal;

   @Input() newUser: Utilisateur;
   @Input() rechMulti: BeanRechercheUtilisateur;
   userManageList : Utilisateur[]=[];
   profilList : Profil[];

   estModeConnecte:Boolean;
   estModeAjout:Boolean;
   source: LocalDataSource = new LocalDataSource();
   settings: any;



	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService,
			   public adminService: AdministrationService,
			   private pagerService: PagerService,
              private datePipe: DatePipe) {
    this.initTableSettings();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
      this.initTableSettings();
    });
  }


	ngOnInit() {

		//this.translate.currentLang;

		this.rechMulti = new BeanRechercheUtilisateur();
		this.rechMulti.refProfil= new Profil();
		this.newUser = new Utilisateur();
		this.newUser.refProfil = new Profil();
		this.estModeAjout = true;

    this.rechercherUtilisateur();
		this.adminService.getListProfil().then(resultat => {
			this.profilList = resultat.data as Profil[];
			this.estModeConnecte = resultat.estModeConnecte;
		
		}, (error => {
			this.resultVO = error;
			this.initializeResultVO();
			if (this.resultVO.isDeconnected) {
			  this.authServiceApp.logoutWithParam();
			}
		  }));

	}

	rechercherUtilisateur(){
		this.adminService.getListUtilisateurs(this.rechMulti).then(resultat => {
			if (resultat) {
				
				this.userManageList = resultat.data as Utilisateur[];
        this.source.load(this.userManageList);

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

	initAjouter(){
		this.newUser = new Utilisateur();
		this.newUser.refProfil = new Profil();
		this.estModeAjout = true;
	}

	initModifier(user){
    //const user = event.data as Utilisateur;
		this.newUser = user;
		this.estModeAjout = false;
	}

	ajouterUtilisateur(){
		
		this.adminService.ajouterNouveauUtilisateur(this.newUser).then(resultat => {
			//morphoPere = resultat.data as MorphoPersonne;
			this.resultVO = resultat;
		}, (error => {
			this.resultVO = error;
			this.initializeResultVO();
			if (this.resultVO.isDeconnected) {
			  this.authServiceApp.logoutWithParam();
			}
		  }));
	}

	private recupererListProfils(){
		this.adminService.getListProfil().then(resultat => {
			this.profilList = resultat.data as Profil[];
			
		}, (error => {
			this.resultVO = error;
			this.initializeResultVO();
			if (this.resultVO.isDeconnected) {
			  this.authServiceApp.logoutWithParam();
			}
		  }));
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
           renderComponent:StatutViewComponent,
           onComponentInitFunction: (instance: any) => {
             instance.save.subscribe(resultat => {

               if(resultat.action === "M"){

                   this.initModifier(resultat.data);

                   this.ajouterModal.show();

               }
               this.rechercherUtilisateur();
             });
             },
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
