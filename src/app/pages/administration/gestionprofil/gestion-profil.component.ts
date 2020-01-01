import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from 'app/views/loginRoot/service/authenticationService';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { AdministrationService } from '../administration.service';
import { Profil } from 'app/model/utilisateur/Profil';
import { PagerService } from 'app/views/pagination-example/pager.service';
import { DesignService } from 'app/service/design/design.service';
import { Menu } from 'app/model/design/menu';
import { SortablejsOptions } from 'ngx-sortablejs';
import {BeanRechercheProfil} from '../model/beanRechercheProfil';
import {LocalDataSource} from "ng2-smart-table";
import {StatutprofilViewComponent} from "./statutprofil-view/statutprofil-view.component";
import {ModalDirective} from "ngx-bootstrap";



@Component({
  selector: 'app-gestion-profil.component',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.scss'],
})

export class GestionProfilComponent implements OnInit {
	
	checkboxes 	: any;
	@Input() resultVO: ResultVO;

  @ViewChild('ajouterModal', {static: false}) ajouterModal:ModalDirective;

	
	color = {
	  "Platinum" : "primary",
	  "Gold"     : "success",
	  "Silver"   : "warning",
	};
	groupOptions : SortablejsOptions = {
		group			: 'testGroup',
		handle		: '.drag-handle',
		animation	: 300,
	};

	simpleOptions : SortablejsOptions = {
		animation : 300,
	};

   @Input() newProfil: Profil;
   @Input() rechMulti: BeanRechercheProfil;
	profilManageList : Profil[]=[];
	profilList : Profil[];
	pager: any = {};
	pagedItems: any[''];
	estModeConnecte:Boolean;
	listAllMenu : Menu[];
	listMenuProfil: Menu[];
	menuSelected:Menu;
	estModeAjout:Boolean;

  source: LocalDataSource = new LocalDataSource();
  settings: any;

	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService,
			   public adminService: AdministrationService,
			   private pagerService: PagerService,
			   private designService:DesignService) {

    this.initTableSettings();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
      this.initTableSettings();
    });
  }

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
        this.source.load(this.profilManageList);
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
			
			for(const menu of this.listAllMenu){
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
		for(const role of profilSelected.roles){
			this.listMenuProfil.push(role.refFct);
		}
	}

	enregistrerProfil(){
		this.construireNouveauMenu();
		const obj = {"profil":this.newProfil, "listfcts":this.listMenuProfil};
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
		for(const menu of this.listAllMenu){
			for(const children of menu.childrenInProfil){
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
        codeProfil: {
          title: this.translate.instant('code'),
          type: 'string',
          sort:true,
        },
        libelleFr: {
          title: 'Libellé FR',
          type: 'string',
          sort:true,
        },
        libelleAr: {
          title: 'Libellé AR',
          type: 'string',
          sort:true,
        },
        estActiver: {
          title: 'Statut',
          type: 'html',
          valuePrepareFunction:(row)=>{
            if(row) {
              return `<span class="fa fa-circle online mr-2"></span> <span class="font-sm">Activer</span>`;
            }else{
              return `<span class="fa fa-circle offline mr-2"></span> <span class="font-sm">Désactiver</span>`;
            }
          },
        },

        action: {
          title: this.translate.instant('Action'),
          type:'custom',
          renderComponent:StatutprofilViewComponent,
          onComponentInitFunction: (instance: any) => {
            instance.save.subscribe(resultat => {

              if(resultat.action === "M"){

                this.initModifier(resultat.data);

                this.ajouterModal.show();

              }
              this.rechercherProfil();
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
