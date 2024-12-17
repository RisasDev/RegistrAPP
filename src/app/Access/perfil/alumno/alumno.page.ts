import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ApiService } from 'src/app/servicios/api.service';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  user = {} as any;
  scanResult = '';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private platform: Platform,
    private api: ApiService,
    private authenticatorService: AuthenticatorService
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      user: any;
    };

    this.user = state.user;
  }

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners().then();
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: {},
        lensFacing: LensFacing.Back
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log('Resultado del escaneo:', data);

    if (data) {
      this.scanResult = data?.barcode?.displayValue;
      this.scanResult = 'Se ha registrado tu asistencia.';
      console.log('Resultado del escaneo:', this.scanResult);
      // Registramos el usuario escaneado a la clase actual
      this.registerStudentToClass(this.scanResult);
    }
  }

  registerStudentToClass(barcodeValue: string) {  
    if (barcodeValue) {
      const userRut = this.user.rut;
  
      // Obtener todas las clases activas
      this.api.getClasses().subscribe((classes: any[]) => {
        if (classes.length > 0) {
          // Ordenar las clases por fecha de inicio y tomar la última
          const lastActiveClass = classes.sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime())[0];
  
          if (lastActiveClass) {
            // Añadir al alumno escaneado a la lista de alumnos de la clase
            lastActiveClass.alumnos.push({ rut: userRut });
  
            // Actualizar la clase en la API
            this.api.updateClass(lastActiveClass.id, lastActiveClass).subscribe((response) => {
              console.log('Alumno registrado en la clase:', response);
            });
          }
        }
      });
    }
  }
}
