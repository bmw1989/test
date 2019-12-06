import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/views/loginRoot/service/authenticationService';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { AdministrationService } from '../administration.service';
import { Profil } from 'app/model/utilisateur/Profil';
import { PagerService } from 'app/views/pagination-example/pager.service';
import { DesignService } from 'app/service/design/design.service';
import { Menu } from 'app/model/design/menu';
import { SortablejsOptions } from 'ngx-sortablejs';
import {BeanRechercheProfil} from '../model/beanRechercheProfil';



@Component({
  selector: 'app-gestion-profil.component',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.scss']
})

export class GestionProfilComponent implements OnInit {
	
	checkboxes 	: any;
	@Input() resultVO: ResultVO;

	public ajouterModal;

	list1				: any[];
	list2				: any[];
	numbers			: any[];
	
	color = {
	  "Platinum" : "primary",
	  "Gold"     : "success",
	  "Silver"   : "warning"
	}
	groupOptions : SortablejsOptions = {
		group			: 'testGroup',
		handle		: '.drag-handle',
		animation	: 300
	};

	simpleOptions : SortablejsOptions = {
		animation : 300
	};

   @Input() newProfil: Profil;
   @Input() rechMulti: BeanRechercheProfil;
	profilManageList : Profil[];
	profilList : Profil[];
	pager: any = {};
	pagedItems: any[''];
	estModeConnecte:Boolean;
	listAllMenu : Menu[];
	listMenuProfil: Menu[];
	menuSelected:Menu;
	estModeAjout:Boolean;

	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService,
			   public adminService: AdministrationService,
			   private pagerService: PagerService,
			   private designService:DesignService) { }

	ngOnInit() {

		this.rechMulti = new BeanRechercheProfil();
		this.newProfil = new Profil();
		this.rechercherProfil();
		this.estModeAjout = true;
	}

	rechercherProfil(){
		this.adminService.getListAllProfils(this.rechMulti).then(resultat => {
			if (resultat) {
				this.profilManageList = resultat.data as Profil[];
				if(this.profilManageList !=undefined)
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
		this.newProfil = new Profil();
		this.estModeAjout = true;
		this.initListDrag(null);
	}

	initModifier(profilSelected:Profil){
		this.initListDrag(profilSelected);
		this.newProfil = profilSelected;
		this.estModeAjout = false;
	}

	onChoisirModule(menuParent:Menu){
		this.menuSelected = menuParent;
	}

	private initListDrag(profilSelected:Profil){
	
		if(profilSelected){
			this.getListMenuDuProfil(profilSelected); // this.listMenuProfil
		}
		
		this.designService.getAllMenu().then(resultat =>{
			this.listAllMenu = resultat.data as Menu[];
			this.listAllMenu = this.listAllMenu.filter(m => m.children);
			
			for(let menu of this.listAllMenu){
				menu.childrenInProfil = [];
				menu.childrenOutProfil = [];
				if(menu.children){
					
					for(let i=0; i< menu.children.length; i++){
						let j=0;
						let isfound = false;
						if(this.listMenuProfil){
							for(; j<this.listMenuProfil.length; j++){
								if(menu.children[i].id === this.listMenuProfil[j].id){
									menu.childrenInProfil.push(menu.children[i]);
									isfound = true;
									break;
								}
							}
							if(!isfound){
								menu.childrenOutProfil.push(menu.children[i]);
							}
						}else{
							if(this.estModeAjout){
								menu.childrenOutProfil.push(menu.children[i]);
							}
						}
					}
				}
			}
		});
	}

	activerProfil(prof:Profil){
		if(confirm("Vous-les vous vraiment activer le profil !")){
			this.adminService.activerProfil(prof).then(resultat => {
				this.resultVO = resultat;
				this.rechercherProfil();
			}, (error => {
				this.resultVO = error;
				this.initializeResultVO();
				if (this.resultVO.isDeconnected) {
				  this.authServiceApp.logoutWithParam();
				}
			}));
		}
	}

	desactiverProfil(prof:Profil){
		if(confirm("Vous-les vous vraiment désactiver le profil !")){
			this.adminService.desactiverProfil(prof).then(resultat => {
				this.resultVO = resultat;
				this.rechercherProfil();
			}, (error => {
				this.resultVO = error;
				this.initializeResultVO();
				if (this.resultVO.isDeconnected) {
				  this.authServiceApp.logoutWithParam();
				}
			}));
		}
	}
	private getListMenuDuProfil(profilSelected:Profil){
		
		this.listMenuProfil = new Array();
		for(let role of profilSelected.roles){
			this.listMenuProfil.push(role.refFct);
		}
	}

	enregistrerProfil(){
		this.construireNouveauMenu();
		let obj = {"profil":this.newProfil, "listfcts":this.listMenuProfil};
		this.adminService.enregistrerProfil(obj).then(resultat => {
			this.resultVO = resultat;
		}, (error => {
			this.resultVO = error;
			this.initializeResultVO();
			if (this.resultVO.isDeconnected) {
			  this.authServiceApp.logoutWithParam();
			}
		  }));
	}

	construireNouveauMenu(){
		this.listMenuProfil = new Array();
		for(let menu of this.listAllMenu){
			for(let children of menu.childrenInProfil){
				this.listMenuProfil.push(children);
			}
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

	 setPage(page: number) {
		if (page < 1 || page > this.pager.totalPages) {
		  return;
		}
	
		// get pager object from service
		this.pager = this.pagerService.getPager(this.profilManageList.length, page);
	
		// get current page of items
		this.pagedItems = this.profilManageList.slice(this.pager.startIndex, this.pager.endIndex + 1);
	  }

}
