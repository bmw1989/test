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
import {ActivatedRoute, Router} from "@angular/router";
import {PersonneMorale} from "../model/personne-morale";
import {host} from "../../../util/constantes-app";

@Component({
  selector: 'app-fiche-contribuable',
  templateUrl: './fiche-contribuable.component.html',
  styleUrls: ['./fiche-contribuable.component.scss'],
})

export class FicheContribuableComponent implements OnInit {

    @Input() resultVO = new ResultVO();
    @Input() newContribuable;
    @Input() typePersonne:string;
    activitePrincipalSelected:TypeActivite;
    activiteSelected:TypeActivite;
    listTypeActPrincipale: TypeActivite[];

    @Input() mode:string = 'CREATION';
    @Input() modeConsultation: boolean = false;
    modeAjout: boolean = true;
    modeModification: boolean = false;
    modeValidation: boolean = false;

    source: LocalDataSource = new LocalDataSource();
    settings: any;

    //Maps attributes
    latitude;
    longitude;
    options;
    streetMaps;
    summit;

    keys = Object.keys;
    civilites = Civilite;
    civiliteSelected= "Mr";

    constructor(private authServiceApp: AuthenticationService,
                private activiteService:ActiviteService,
                private contribuableService:ContribuableService,
                public translate: TranslateService,
                private activatedRoute: ActivatedRoute,
                private authService:AuthenticationService) {

      this.initTableSettings();
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translate.use(event.lang);
        this.initTableSettings();
      });

      const type = this.activatedRoute.snapshot.paramMap.get("type");
      if(type!=null && type!==undefined){
        this.typePersonne = type;
      }
    }

    ngOnInit() {

      this.getListTypeActivitePrincipal();
      if (this.mode === 'CREATION') {
        if(this.typePersonne==='P'){
          this.newContribuable = new PersonnePhysique();
        }else{
          this.newContribuable = new PersonneMorale();
        }

        this.newContribuable.listActivite = [];
        this.newContribuable.civilite = 'Mr';
        this.latitude= 18.088423;
        this.longitude= -15.976214;

        this.modeConsultation = false;
        this.modeModification = false;
        this.modeValidation = false;
        this.modeAjout = true;
      }
      else {

        if (this.mode === 'MODIF') {
          this.modeConsultation = false;
          this.modeModification = true;
          this.modeValidation = false;
          this.modeAjout = false;
        }
        else if (this.mode === 'CONSULTATION') {
          this.modeConsultation = true;
          this.modeModification = false;
          this.modeValidation = false;
          this.modeAjout = false;
        }
        else if (this.mode === 'VALIDATION') {
          this.modeConsultation = true;
          this.modeModification = false;
          this.modeValidation = true;
          this.modeAjout = false;
        }
        if (this.newContribuable != null) {

          this.latitude= this.newContribuable.latitude;
          this.longitude= this.newContribuable.longitude;

          //this.formaterActeNaissancePourConsultation();
        }
      }
      if(this.newContribuable.photo == null){
        this.newContribuable.photo ='assets/img/contribuable/default-img.gif';
      }

      this.initMaps();
    }

    initMaps(){

      // Define our base layers so we can reference them multiple times

      this.streetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });

      this.summit = L.marker([ this.latitude, this.longitude ], {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png',
        }), draggable: true, autoPan: true,
      }).on('dragend', function(event) {
        const mark = event.target;
        const coord = String(mark.getLatLng()).split(',');
        //console.log(coord);
        const lat = coord[0].split('(');

        const lng = coord[1].split(')');

        this.latitude = lat[1];
        this.longitude = lng[0];

        (<HTMLInputElement>window.document.getElementById("inputlartitude")).value = this.latitude;
        (<HTMLInputElement>window.document.getElementById("inputlongitude")).value = this.longitude;

        mark.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".").update();
      });

      this.options = {
        layers: [
          this.streetMaps, this.summit, //this.route, this.summit, this.paradise,
        ],
        zoom: 13,
        center: L.latLng({ lat: this.latitude, lng: this.longitude }),
      };
    }

    mapReady(map: L.Map) {

    // fix the map fully displaying, existing leaflet bag
    setTimeout(() => {
      map.invalidateSize();
    }, 11500);
  }

    enregistrerContribuable():void {

      this.resultVO = new ResultVO();

      if (this.isValidContribuable()) {

        this.newContribuable.latitude= this.latitude;
        this.newContribuable.longitude = this.longitude;
        this.newContribuable.photo = null; //For test

        //il faut supprimer les activites principal
        this.deleteActivitePrincipalForSave();
        if(this.typePersonne === "P"){
          this.contribuableService.savePersonnePhysique(this.newContribuable).then(resultat => {
            this.resultVO = resultat;
            this.newContribuable = resultat.data as PersonnePhysique;

            const url = host + '/imprimerFSPersonnePhy?username='+btoa(this.authService.getUserConnected())
              +'&acte='+ encodeURIComponent(JSON.stringify(this.newContribuable)) ;
            window.open(url);
          }, (error => {
            this.resultVO = error;
            this.initializeResultVO();
            if (this.resultVO.isDeconnected) {
              this.authServiceApp.logoutWithParam();
            }
          }));
        }else{
          this.contribuableService.savePersonneMorale(this.newContribuable).then(resultat => {
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

      }
    }

    private deleteActivitePrincipalForSave(){
      for(let i=0; i<this.newContribuable.listActivite.length;i++){
        this.newContribuable.listActivite[i].refActivite.refTypeActivite = null;

      }
    }
	  ajouterActivite(){
      if(this.validationActivite()){

        const fiche: FicheActivite = new FicheActivite();

        this.activiteSelected.refTypeActivite = this.activitePrincipalSelected;
        fiche.refActivite = this.activiteSelected;
        fiche.dateCreation = new Date();
        this.newContribuable.listActivite.push(fiche);
        this.source.load(this.newContribuable.listActivite);

      }

    }

    private isValidContribuable():boolean{

      if(this.mode==='CREATION' && this.typePersonne==='P'){
        this.rechercherPersonnePhy();
      }

      if(this.typePersonne==='P') {
        if (this.newContribuable.nni == null || this.newContribuable.nni === '') {
          this.resultVO.messagesErrors.push(this.getMessage('MSG.CONTRIBUABLE.ERR.MSG_ERR_CONT_002'));
        }
        if (this.newContribuable.nomFr == null || this.newContribuable.nomFr === '') {
          this.resultVO.messagesErrors.push(this.getMessage('MSG.CONTRIBUABLE.ERR.MSG_ERR_CONT_003'));
        }
        if (this.newContribuable.prenomFr == null || this.newContribuable.prenomFr === '') {
          this.resultVO.messagesErrors.push(this.getMessage('MSG.CONTRIBUABLE.ERR.MSG_ERR_CONT_004'));
        }
      }

      if( this.resultVO.messagesErrors.length>0){
        this.initializeResultVO();
        return false;
      }else{
        return true;
      }

    }

    validationActivite(){

      for(let i = 0; i<this.newContribuable.listActivite.length; i++){
        if(this.newContribuable.listActivite[i].refActivite.code === this.activiteSelected.code){

          const val = this.translate.currentLang === 'fr'? this.newContribuable.listActivite[i].refActivite.libelleFr:this.newContribuable.listActivite[i].refActivite.libelleAr;

          const message = this.getMessage('MSG_ERR.CONTRIBUABLE.MSG_ERR_CONT_001', val);
          this.resultVO.messagesErrors = [message];
          this.initializeResultVO();
          return false;
        }
      }
      return true;

    }

    private getMessage(message:string, val?):string{
      if(val == null)
        return this.translate.instant(message);
      return this.translate.instant(message, {value: val});
    }

   changeActivitePrincipal(typeActPrincipale){
     this.activitePrincipalSelected = typeActPrincipale;
   }

	 private getListTypeActivitePrincipal(){
     this.activiteService.getAllParentActivite().then(resultat => {
       if (resultat) {
         this.listTypeActPrincipale = resultat.data as TypeActivite[];

         if(this.mode !== 'CREATION') {
           this.alimenterFicheActivitePrincipal();
           this.source.load(this.newContribuable.listActivite);

         }
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.newContribuable.photo = event.target.result;

    });

    reader.readAsDataURL(file);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.newContribuable.listActivite = this.newContribuable.listActivite.filter(obj => obj!==event.data);
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
        code: {
          title : this.translate.instant('numero'),
          type : "string",
          filter:false,
          valuePrepareFunction:(value,row,cell) =>{
            const paging:IPaging = this.source.getPaging();
            const ret = (paging.page-1) * paging.perPage + cell.row.index+1;
            return ret;
          },
        },
        activitePrincipal: {
          title: this.translate.instant('activite principal'),
          type: 'string',
          valuePrepareFunction:(value,row) =>{

            return row.refActivite.refTypeActivite.libelleFr;
          },
        },
        refActivite: {
          title: this.translate.instant('activite'),
          type: 'string',
          valuePrepareFunction:(value) =>{

            return value.libelleFr;
          },
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

  rechercherPersonnePhy(){
      const rechMulti:BeanRecherchePersonnePhy = new BeanRecherchePersonnePhy();
      rechMulti.nni = this.newContribuable.nni;
      this.contribuableService.getListPersonnePhy(rechMulti).then(resultat => {
      if (resultat) {

        const listPers = resultat.data as PersonnePhysique[];
        if(listPers != null && listPers.length>0){

          const message = this.getMessage('MSG.CONTRIBUABLE.ERR.MSG_ERR_CONT_005', this.newContribuable.nni);

          if (this.resultVO.messagesErrors == null){
            this.resultVO.messagesErrors = [message];
          }

          this.initializeResultVO();

        }

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

	  private alimenterFicheActivitePrincipal(){
      this.newContribuable.listActivite.forEach(fiche =>{
        this.listTypeActPrincipale.forEach(actPrin =>{

          if(actPrin.children != null && actPrin.children !== undefined && actPrin.children.length>0) {
            actPrin.children.forEach(child => {
              if (fiche.refActivite.code === child.code) {
                fiche.refActivite.refTypeActivite = actPrin;

              }
            });
          }
        });
      });
    }

}
