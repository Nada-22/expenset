import { NgClass } from '@angular/common';
import { Component, input, Input, output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ButtonTypeE } from '../../../core/enums/button.enum';
import { IconComponent } from "../icon/icon.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    NgClass,
    IconComponent,
    TranslateModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {


  // @Input({ required: true }) styleType: BtnType = 'primBtn';

  @Input({ required: true }) styleType: ButtonTypeE = ButtonTypeE.Primary;

  label = input<string>('');
  btnType = input<string>('button');

  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);

  icon = input<string>();
  jsonIcon = input<string>('');
  primeIcon = input<string>('');

  class = input<string>('');
  iconClass = input<string>('btn_icon');
  iconPos = input<'end' | 'start'>('start');


  buttonClick = output<Event>();



  emitClickEvent(event:Event): void {
    this.buttonClick.emit(event);
  }

  ngOnInit(): void {


  }


}
