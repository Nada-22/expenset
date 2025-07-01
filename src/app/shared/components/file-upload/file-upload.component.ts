import { Component, inject, input, output } from '@angular/core';
import { FileService } from '@services/file.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  fileService = inject(FileService);
  toastService = inject(ToastService);

  fileUploaded = output<File>();
  file!: File;
  uploadFile(event: any) {


    let file = event.target.files[0] as File;
    this.fileService.validateFileSignature(file).then(result => {
      switch (result.status) {
        case 'allowed':

          this.file = file;
          this.fileUploaded.emit(file);
          break;

        case 'invalid-type':

          this.toastService.showErrorToast('Invalid file type, you should upload jpg or jpeg or png or pdf');

          break;

        case 'spoofing':

          this.toastService.showErrorToast('The uploaded file appears suspicious and was blocked.');

          // log this process to know the user 

          break;
      }
    });
  }
}
