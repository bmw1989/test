import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utilisateur } from 'app/model/utilisateur/Utilisateur';
import { AuthenticationService } from 'app/views/loginRoot/service/authenticationService';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { AdministrationService } from '../administration.service';
import { Profil } from 'app/model/utilisateur/Profil';
import { PagerService } from 'app/views/pagination-example/pager.service';
import {BeanRechercheUtilisateur} from '../model/beanRechercheUtilisateur';


@Component({
  selector: 'app-gestion-utilisateur.component',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.scss']
})

export class GestionutilisateurComponent implements OnInit {
	
	checkboxes 	: any;
	@Input() resultVO: ResultVO;

	public ajouterModal;
	
	color = {
	  "Platinum" : "primary",
	  "Gold"     : "success",
	  "Silver"   : "warning"
   }

   @Input() newUser: Utilisateur;
   @Input() rechMulti: BeanRechercheUtilisateur;
	userManageList : Utilisateur[];
	profilList : Profil[];
	pager: any = {};
	pagedItems: any[''];
	estModeConnecte:Boolean;
	estModeAjout:Boolean;




	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService,
			   public adminService: AdministrationService,
			   private pagerService: PagerService) { }


	ngOnInit() {

		//this.translate.currentLang;

		this.rechMulti = new BeanRechercheUtilisateur();
		this.rechMulti.refProfil= new Profil();
		this.newUser = new Utilisateur();
		this.newUser.refProfil = new Profil();
		this.estModeAjout = true;
	
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

		this.adminService.getListUtilisateurs(this.rechMulti).then(resultat => {
			if (resultat) {
				
				this.userManageList = resultat.data as Utilisateur[];
				if(this.userManageList !=undefined)
					this.setPage(1);
				console.log(this.userManageList);
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

	rechercherUtilisateur(){
		this.adminService.getListUtilisateurs(this.rechMulti).then(resultat => {
			if (resultat) {
				
				this.userManageList = resultat.data as Utilisateur[];
				//console.log("users :");
				//console.log(this.userManageList);
				if(this.userManageList !=undefined)
				this.setPage(1);
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

	initModifier(user:Utilisateur){
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

	activerUtilisateur(user:Utilisateur){
		if(confirm("Vous-les vous vraiment activer l'utilisateur !")){
			this.adminService.activerUtilisateur(user).then(resultat => {
				this.resultVO = resultat;
				this.rechercherUtilisateur();
			}, (error => {
				this.resultVO = error;
				this.initializeResultVO();
				if (this.resultVO.isDeconnected) {
				  this.authServiceApp.logoutWithParam();
				}
			}));
		}
	}

	desactiverUtilisateur(user:Utilisateur){
		if(confirm("Vous-les vous vraiment désactiver l'utilisateur !")){
			this.adminService.desactiverUtilisateur(user).then(resultat => {
				this.resultVO = resultat;
				this.rechercherUtilisateur();
			}, (error => {
				this.resultVO = error;
				this.initializeResultVO();
				if (this.resultVO.isDeconnected) {
				  this.authServiceApp.logoutWithParam();
				}
			}));
		}
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
	  
	  /**
	   * 
	   * @param response objet de retour
	   */
	  getAddUserPopupResponse(response: any){
		  if(response){
			  let addUser = {
				  image: "assets/img/user-4.jpg",
				  firstName : response.firstName,
				  lastName : response.lastName,
				  email : response.email,
				  accountType : response.accountType,
				  status : "Active",
				  statusType : "online",
				  time:"Since 1 hour",
				  dateCreated : new Date()//,
				  //accountTypeColor : this.color[response.accountType]
			  }
			  //this.userManageList.push(addUser);     
		 }
	 }
	 setPage(page: number) {
		if (page < 1 || page > this.pager.totalPages) {
		  return;
		}
	
		// get pager object from service
		this.pager = this.pagerService.getPager(this.userManageList.length, page);
	
		// get current page of items
		this.pagedItems = this.userManageList.slice(this.pager.startIndex, this.pager.endIndex + 1);
	  }

}
