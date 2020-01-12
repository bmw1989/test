import {TranslateService} from "@ngx-translate/core";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import localeAr from "@angular/common/locales/ar";

export class DynamicLocaleId extends String {
  constructor(protected service: TranslateService) {
    super('');
  }

  toString() {
    if(this.service.currentLang === 'ar'){
      registerLocaleData(localeAr);
      return 'ar';
    }

    else{
      registerLocaleData(localeFr);
      return 'fr-FR';
    }

  }
}

