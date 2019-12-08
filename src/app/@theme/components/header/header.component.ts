import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbLayoutDirection, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbLayoutDirectionService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../views/loginRoot/service/authenticationService';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;


  directions = NbLayoutDirection;
  currentDirection: NbLayoutDirection;


  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';
  currentLang ='fr';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              public translate: TranslateService,
              private directionService: NbLayoutDirectionService,
              private breakpointService: NbMediaBreakpointsService,
              private authService:AuthenticationService) {

              this.currentDirection = this.directionService.getDirection();

              this.directionService.onDirectionChange()
                .pipe(takeUntil(this.destroy$))
                .subscribe(newDirection => this.currentDirection = newDirection);
  }

  ngOnInit() {

    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLang(value){
    this.translate.use(value);
   
    if (value=='ar') {
      this.directionService.setDirection(this.directions.RTL);
		} else {
      this.directionService.setDirection(this.directions.LTR);
		}
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
