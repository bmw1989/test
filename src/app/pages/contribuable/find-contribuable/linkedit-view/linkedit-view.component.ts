import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import {ResultVO} from "../../../../model/commun/vo/ResultVO";
import {AuthenticationService} from "../../../loginRoot/service/authenticationService";



@Component({
  template: `<a [routerLink]= "['/auth/register',rowData]"> <i class="ion-edit"></i></a>`,
})
export class LinkeditViewComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Input() resultVO: ResultVO;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private authServiceApp: AuthenticationService) {

  }
  ngOnInit() {


  }

}
