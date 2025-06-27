import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-box',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './empty-box.component.html',
  styleUrl: './empty-box.component.scss'
})
export class EmptyBoxComponent {
  title = input('No Data Found');
  imgUrl = input('imgs/svg/empty-data.svg');
  description = input('Sorry , No data found in this section');
  link = input({ label: '', routerLink: '' });
}
