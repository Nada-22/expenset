import { Injectable } from '@angular/core';
import { allowedSignatures } from '@components/file-upload/file-signatures';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor() { }

  validateFileSignature(file: File): Promise<{
    status: 'allowed' | 'invalid-type' | 'spoofing';
    message: string;
    details: {
      fileName: string;
      claimedType: string;
      detectedType: string;
      magicHeader: string;
      fileType?: string;
    };

  }> {
    return new Promise(async (resolve) => {
      const allowedMagicMap = allowedSignatures;
      const allowedExtensions = Object.values(allowedMagicMap);

      const fileName = file.name;
      const claimedType = file.type;
      const extension = this.getFileExtension(fileName);

      try {
        const magicHeader = await this.getMagicHeader(file);
        const detectedType = this.getDetectedType(magicHeader, allowedMagicMap);

        // Spoofing case
        if (allowedExtensions.includes(extension) && extension !== detectedType) {
          return resolve({
            status: 'spoofing',
            message: 'Extension/type mismatch with actual file bytes.',
            details: { fileName, claimedType, detectedType, magicHeader, fileType: extension }
          });
        }

        // Invalid extension
        if (!allowedExtensions.includes(extension)) {
          return resolve({
            status: 'invalid-type',
            message: 'Not an allowed file type.',
            details: { fileName, claimedType, detectedType, magicHeader }
          });
        }

        //success
        return resolve({
          status: 'allowed',
          message: 'Valid file.',
          details: { fileName, claimedType, detectedType, magicHeader },

        });

      } catch (err) {
        return resolve({
          status: 'invalid-type',
          message: 'Could not read file content.',
          details: { fileName, claimedType, detectedType: 'unknown', magicHeader: '' }
        });
      }
    });
  }

  // ---------------------
  //------ Helpers-------
  // ---------------------

  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  private getMagicHeader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!reader.result || typeof reader.result === 'string') {
          return reject('File content unreadable.');
        }
        const bytes = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
        const header = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(header);
      };
      reader.onerror = () => reject('Error reading file.');
      reader.readAsArrayBuffer(file.slice(0, 4));
    });
  }

  private getDetectedType(magicHeader: string, magicMap: Record<string, string>): string {
    return Object.entries(magicMap).find(([magic]) =>
      magicHeader.startsWith(magic)
    )?.[1] || 'unknown';
  }


}
