import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import {Utilisateur} from "../../../../model/utilisateur/Utilisateur";
import {ResultVO} from "../../../../model/commun/vo/ResultVO";
import {AuthenticationService} from "../../../loginRoot/service/authenticationService";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {AdministrationService} from "../../administration.service";
import {PagerService} from "../../../../views/pagination-example/pager.service";
import {DatePipe} from "@angular/common";

@Component({
  template: `
    <ng-template [ngIf]="rowData.estActiver" [ngIfElse]="desac">
      <a class="mr-3 text-muted" href="javascript:void(0)" (click)="desactiverUtilisateur(rowData)"> Désactiver</a>
    </ng-template>
    <ng-template #desac>
      <a class="mr-3 text-muted" href="javascript:void(0)" (click)="activerUtilisateur(rowData)"> Activer</a>
    </ng-template>
    <a class="mr-3 text-muted" href="javascript:void(0)" data-toggle="modal" (click)="onModifier(rowData)"><i class="fa fa-edit" aria-hidden="true"></i></a>
  `,
})
export class StatutViewComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Input() resultVO: ResultVO;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private authServiceApp: AuthenticationService,
              public adminService: AdministrationService) {

  }
  ngOnInit() {


  }

  activerUtilisateur(user){
    if(confirm("Vous-les vous vraiment activer l'utilisateur !")){
      this.adminService.activerUtilisateur(user).then(resultat => {
        this.resultVO = resultat;
        this.resultVO.action = "A";
        this.save.emit(this.resultVO);
      }, (error => {
        this.resultVO = error;
        //this.initializeResultVO();
        if (this.resultVO.isDeconnected) {
          this.authServiceApp.logoutWithParam();
        }
      }));
    }
  }

  desactiverUtilisateur(user){
    if(confirm("Vous-les vous vraiment désactiver l'utilisateur !")){
      this.adminService.desactiverUtilisateur(user).then(resultat => {
        this.resultVO = resultat;
        this.resultVO.action = "D";
        this.save.emit(this.resultVO);
      }, (error => {
        this.resultVO = error;
        //this.initializeResultVO();
        if (this.resultVO.isDeconnected) {
          this.authServiceApp.logoutWithParam();
        }
      }));
    }
  }

  onModifier(user){

    //this.estModeAjout = false;
    this.resultVO = new ResultVO();
    this.resultVO.action = "M";
    this.resultVO.data = user;

    this.save.emit(this.resultVO);
  }
}
