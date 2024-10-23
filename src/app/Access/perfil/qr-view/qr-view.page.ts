import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-view',
  templateUrl: './qr-view.page.html',
  styleUrls: ['./qr-view.page.scss'],
})
export class QrViewPage {
  qrData: string;

  constructor() {
    this.qrData = "Aquí va tu información para el QR"; // Cambia esto a lo que necesites
  }
}
