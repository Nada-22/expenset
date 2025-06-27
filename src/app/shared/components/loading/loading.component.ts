import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppService } from '@services/app.service';
import { AppState } from '@state/app.state';

@Component({
  selector: 'fw-loading',
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
  // Input to control visibility of the loading overlay
  isVisible = input<boolean>(false);
  
  // Optional message to display during loading
  message = input<string>('Loading...');
 appState = inject(AppState);
}