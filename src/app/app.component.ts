/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, translate: TranslateService) {
    translate.addLangs(['ar', 'fr']);
		translate.setDefaultLang('fr');

		const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/fr|ar/) ? browserLang : 'fr');

  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
