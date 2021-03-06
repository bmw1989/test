import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS , navItems} from './pages-menu';
import { NbMenuItem } from '@nebular/theme';
import { AuthenticationService } from './loginRoot/service/authenticationService';
import { DesignService } from '../service/design/design.service';
import { Router } from '@angular/router';
import { PagesMenuTranslator } from './pages-menu-translator';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  providers: [PagesMenuTranslator],
})
export class PagesComponent implements OnInit{

  menu    : NbMenuItem[];

  constructor(private authServiceApp: AuthenticationService,
    private designService:DesignService,
    private router: Router, private translator: PagesMenuTranslator){}

  ngOnInit() {
   this.getListMenu();
   this.menu = [];
  }

  getListMenu() {
		this.designService.getMenuByUser().then(data =>{

    //console.log(data);

    let mdashboard = new NbMenuItem();
    mdashboard.title = 'accueil';
    mdashboard.icon = 'home-outline';
    mdashboard.link = '/pages/dashboard';
    this.menu.push(mdashboard);
    this.menu.push.apply(this.menu,data as NbMenuItem[] );
    this.menu=this.translator.translate(this.menu);
    
	  }, (error =>{
		 if (error == 403) {
		  this.authServiceApp.logout();
		  this.router.navigateByUrl("/logout");
		}
    })); 
  }
}
