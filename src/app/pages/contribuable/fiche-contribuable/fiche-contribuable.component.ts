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
import {IPaging} from "../../../model/design/IPaging";

@Component({
  selector: 'app-fiche-contribuable.component',
  templateUrl: './fiche-contribuable.component.html',
  styleUrls: ['./fiche-contribuable.component.scss'],
})

export class FicheContribuableComponent implements OnInit {

    @Input() resultVO = new ResultVO();
    @Input() newContribuable: PersonnePhysique;
    activitePrincipalSelected:TypeActivite;
    activiteSelected:TypeActivite;
    listTypeActPrincipale: TypeActivite[];
    listActivitesChoisies: TypeActivite[];
    selectedFile ;
    source: LocalDataSource = new LocalDataSource();
    settings: any;

    //Maps attributes
    options;
    streetMaps;
    wMaps;
    summit;
    paradise;
    route;
    layersControl;

    keys = Object.keys;
    civilites = Civilite;
    civiliteSelected= "Mr";

    constructor(private authServiceApp: AuthenticationService,
                private activiteService:ActiviteService,
                private contribuableService:ContribuableService,
                public translate: TranslateService) {


      this.newContribuable = new PersonnePhysique();

      //this.newContribuable.civilite = 'Mr';
      this.newContribuable.latitude= 46.879966;
      this.newContribuable.longitude = -121.726909;
      this.getListTypeActivitePrincipal();

      this.initTableSettings();
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translate.use(event.lang);
        this.initTableSettings();
      });
    }

    ngOnInit() {

      this.listActivitesChoisies = [];

      this.selectedFile ='assets/img/contribuable/default-img.gif';
        this.initMaps();
    }

    initMaps(){

      // Define our base layers so we can reference them multiple times
      this.streetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
      this.wMaps = L.tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });

      // Marker for the top of Mt. Ranier
      this.summit = L.marker([ 46.8523, -121.7603 ], {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png',
        }),
      });

      // Marker for the parking lot at the base of Mt. Ranier trails
      this.paradise = L.marker([ 46.78465227596462,-121.74141269177198 ], {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png',
        }),
      });

      // Path from paradise to summit - most points omitted from this example for brevity
      this.route = L.polyline([[ 46.78465227596462,-121.74141269177198 ],
        [ 46.80047278292477, -121.73470708541572 ],
        [ 46.815471360459924, -121.72521826811135 ],
        [ 46.8360239546746, -121.7323131300509 ],
        [ 46.844306448474526, -121.73327445052564 ],
        [ 46.84979408048093, -121.74325201660395 ],
        [ 46.853193528950214, -121.74823296256363 ],
        [ 46.85322881676257, -121.74843915738165 ],
        [ 46.85119913890958, -121.7519719619304 ],
        [ 46.85103829018772, -121.7542376741767 ],
        [ 46.85101557523012, -121.75431755371392 ],
        [ 46.85140013694763, -121.75727385096252 ],
        [ 46.8525277543813, -121.75995212048292 ],
        [ 46.85290292836726, -121.76049157977104 ],
        [ 46.8528160918504, -121.76042997278273 ]]);

      // Layers control object with our two base layers and the three overlay layers
      this.layersControl = {
        baseLayers: {
          'Street Maps': this.streetMaps,
          'Wikimedia Maps': this.wMaps,
        },
        overlays: {
          'Mt. Rainier Summit': this.summit,
          'Mt. Rainier Paradise Start': this.paradise,
          'Mt. Rainier Climb Route': this.route,
        },
      };

      this.options = {

        layers: [
          this.streetMaps, this.route, this.summit, this.paradise,
        ],
        zoom: 7,
        center: L.latLng({ lat: this.newContribuable.latitude, lng: this.newContribuable.longitude }),

      };
    }

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom({position: 'bottomright'}));

    map.fitBounds(this.route.getBounds(), {
      padding: L.point(24, 24),
      maxZoom: 12,
      animate: true,
    });

    // fix the map fully displaying, existing leaflet bag
    setTimeout(() => {
      map.invalidateSize();
    }, 10000);
  }
    ajouterContribuable(){
      const listActivites : FicheActivite[]= [];
      for(const typeActv of this.listActivitesChoisies){
        
        const fiche:FicheActivite = new FicheActivite();

        fiche.refActivite = typeActv;
        listActivites.push(fiche);
      }
      this.newContribuable.listActivite = listActivites;
      this.contribuableService.ajouterNouveauPersonnePhysique(this.newContribuable).then(resultat => {
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

	  ajouterActivite(){
      if(this.validationActivite()){

        this.activiteSelected.refTypeActivite = this.activitePrincipalSelected.libelleFr;
        this.listActivitesChoisies.push(this.activiteSelected);
        this.source.load(this.listActivitesChoisies);

      }

    }


    validationActivite(){

      for(let i = 0; i<this.listActivitesChoisies.length; i++){
        if(this.listActivitesChoisies[i].code === this.activiteSelected.code){
          const message ="l'activité "+ this.listActivitesChoisies[i].libelleFr + " existe déjà";
          this.resultVO.messagesErrors = [message];
          this.initializeResultVO();
          return false;
        }
      }
      return true;

    }

    changeActivitePrincipal(typeActPrincipale){
      this.activitePrincipalSelected = typeActPrincipale;
    }

	  private getListTypeActivitePrincipal(){
      this.activiteService.getAllMenu().then(resultat => {
        if (resultat) {
          this.listTypeActPrincipale = resultat.data as TypeActivite[];
          //this.civiliteSelected= Civilite.Mme;
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


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = event.target.result;

    });

    reader.readAsDataURL(file);
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
