import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import {Utilisateur} from "../../../../model/utilisateur/Utilisateur";
import {ResultVO} from "../../../../model/commun/vo/ResultVO";
import {AuthenticationService} from "../../../loginRoot/service/authenticationService";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {AdministrationService} from "../../administration.service";
import {PagerService} from "../../../../views/pagination-example/pager.service";
import {DatePipe} from "@angular/common";
import {Profil} from "../../../../model/utilisateur/Profil";

@Component({
  template: `
    <ng-template [ngIf]="rowData.estActiver==1" [ngIfElse]="desac">
      <a class="mr-3 text-muted" href="javascript:void(0)" (click)="desactiverProfil(rowData)"> Désactiver</a>
    </ng-template>
    <ng-template #desac>
      <a class="mr-3 text-muted" href="javascript:void(0)" (click)="activerProfil(rowData)"> Activer</a>
    </ng-template>
    <a class="mr-3 text-muted" href="javascript:void(0)" data-toggle="modal" (click)="onModifier(rowData)"><i class="fa fa-edit" aria-hidden="true"></i></a>
  `,
})
export class StatutprofilViewComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Input() resultVO: ResultVO;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() action: EventEmitter<any> = new EventEmitter();

  constructor(private authServiceApp: AuthenticationService,
              public adminService: AdministrationService) {

  }
  ngOnInit() {


  }

  activerProfil(prof:Profil){
    if(confirm("Vous-les vous vraiment activer le profil !")){
      this.adminService.activerProfil(prof).then(resultat => {
        this.resultVO = resultat;
        this.resultVO.action = "A";
        this.save.emit(this.resultVO);
      }, (error => {
        this.resultVO = error;
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
        this.resultVO.action = "D";
        this.save.emit(this.resultVO);
      }, (error => {
        this.resultVO = error;
        if (this.resultVO.isDeconnected) {
          this.authServiceApp.logoutWithParam();
        }
      }));
    }
  }

  onModifier(profil){

    //this.estModeAjout = false;
    this.resultVO = new ResultVO();
    this.resultVO.action = "M";
    this.resultVO.data = profil;

    this.save.emit(this.resultVO);
  }
}
