import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppState } from '@state/app.state';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  isVisible = input<boolean>(false);


  message = input<string>('Loading...');
  appState = inject(AppState);
}