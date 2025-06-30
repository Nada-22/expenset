import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from "./shared/components/loading/loading.component";

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

  constructor() {
    this.translateService.setDefaultLang('en');
  }
}
