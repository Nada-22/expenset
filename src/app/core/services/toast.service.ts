import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private messageService = inject(MessageService);

  showSuccessToast(message: string) {
    this.messageService.add({
      severity: 'success',
      detail: message,
      // icon: 'pi-check-circle',

    });
  }
  showInfoToast(message: string) {
    this.messageService.add({
      severity: 'info',
      detail: message,

    });
  }
  showWarnToast(message: string) {
    this.messageService.add({
      severity: 'warn',
      detail: message,

    });
  }
  showErrorToast(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message,


    });
  }
}
