import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { TranslationService } from '@services/translation.service';
import { LangE } from './core/enums/lang.enum';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastModule,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'expenset';
  translateService = inject(TranslateService);
  _translation=inject(TranslationService);

  constructor() {
   
    this.setCurrentLang();
  }

  setCurrentLang() {
    const savedLang = localStorage.getItem('lang') as LangE;
    if (savedLang) {
      this._translation.defaultLang.set(savedLang);
    }

    this.translateService.setDefaultLang(this._translation.defaultLang());
    this._translation.changeLang(this._translation.defaultLang())
  }
}
