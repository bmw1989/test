import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';
import { AuthenticationService } from '../views/loginRoot/service/authenticationService';
import { DesignService } from '../service/design/design.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu    : NbMenuItem[];

  constructor(private authServiceApp: AuthenticationService,
    private designService:DesignService,
    private router: Router){}

  ngOnInit() {
    this.getListMenu();
  }

  getListMenu() {
		this.designService.getMenuByUser().then(data =>{
		this.menu = data as NbMenuItem[];
	  }, (error =>{
		 if (error == 403) {
		  this.authServiceApp.logout();
		  this.router.navigateByUrl("/logout");
		}
    })); 
  }
}
