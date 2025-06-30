import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangE } from '../enums/lang.enum';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  translateService = inject(TranslateService);
  defaultLang = signal(LangE.EN);

  constructor() { }

  changeLang(lang: LangE) {

    this.translateService.use(lang);

    localStorage.setItem('lang', lang);
    switch (lang) {
      case LangE.AR:
        document.dir = 'rtl';
        document.body.dir = 'rtl';

        break;

      case LangE.EN:
        document.dir = 'ltr';
        document.body.dir = 'ltr';
        break;

      default:
        break;
    }
    console.log(lang);

    this.defaultLang.set(lang);

  }

}


