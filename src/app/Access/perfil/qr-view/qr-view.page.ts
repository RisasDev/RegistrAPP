import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';
import { ApiService } from 'src/app/servicios/api.service';
import { EmailService } from 'src/app/servicios/email.service';

@Component({
  selector: 'app-qr-view',
  templateUrl: './qr-view.page.html',
  styleUrls: ['./qr-view.page.scss'],
})
export class QrViewPage {
  user = {} as any;

  qrAssist = 'Se ha registrado tu asistencia.';

  qrHours: number = 0;
  qrMinutes: number = 0;

  clase = {
    id: uuidv4(),
    profesor: '',
    fecha_inicio: new Date(),
    fecha_termino: new Date(),
    alumnos: [],
    estado: true,
  };

  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private router: Router,
    private authenticatorService: AuthenticatorService,
    private api: ApiService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      user: any;
      qrHours: number;
      qrMinutes: number;
    };

    this.user = state.user;
    this.qrHours = state.qrHours;
    this.qrMinutes = state.qrMinutes;

    setTimeout(() => {
      this.iniciarClase();
      this.startClassTimer();
    }, 1000);
  }

  iniciarClase() {
    console.log('Iniciando clase...');

    const fechaInicio = new Date(this.clase.fecha_inicio);
    const fechaTermino = new Date(fechaInicio);

    fechaTermino.setHours(fechaTermino.getHours() + this.qrHours);
    fechaTermino.setMinutes(fechaTermino.getMinutes() + this.qrMinutes);

    this.clase.fecha_termino = fechaTermino;
    this.clase.profesor = this.user.firstname + ' ' + this.user.lastname;

    this.authenticatorService.createClass(
      this.clase.id,
      this.clase.profesor,
      this.clase.fecha_inicio,
      this.clase.fecha_termino,
      this.clase.alumnos,
      this.clase.estado
    );
    
    console.log('Clase iniciada', this.clase);

    /*this.emailService.sendEmail(
      this.clase.profesor, 
      'risasdev.cl@gmail.com', 
      'iniciar'
    ).subscribe((response) => {
      console.log('Correo enviado', response);
    });*/
  }

  startClassTimer() {
    const tiempoRestante =
      this.clase.fecha_termino.getTime() - this.clase.fecha_inicio.getTime();

    if (tiempoRestante > 0) {
      setTimeout(() => {
        this.updateClassState();
      }, tiempoRestante);
    }
  }

  updateClassState() {
    const updateClass = {
      id: this.clase.id,
      profesor: this.clase.profesor,
      fecha_inicio: this.clase.fecha_inicio,
      fecha_termino: this.clase.fecha_termino,
      alumnos: this.clase.alumnos,
      estado: false,
    };

    this.api.updateClass(this.clase.id, updateClass).subscribe((response) => {
      console.log('Clase finalizada automáticamente', response);
    });

    /*this.emailService.sendEmail(
      this.clase.profesor, 
      'risasdev.cl@gmail.com', 
      'terminar'
    ).subscribe((response) => {
      console.log('Correo enviado', response);
    });*/
  }

  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      this.downloadImage(canvas);
      if (this.platform.is('capacitor')) this.shareImage(canvas);
      else this.downloadImage(canvas);
    });
  }

  // Download image
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qrAssist.png';
    link.click();
  }

  // Share image
  async shareImage(canvas: HTMLCanvasElement) {
    let base64 = canvas.toDataURL();
    let path = 'qrAssist.png';

    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    await Filesystem.writeFile({
      path: path,
      data: base64,
      directory: Directory.Cache,
    })
      .then(async (res) => {
        let uri = res.uri;
        await Share.share({ url: uri });
        await Filesystem.deleteFile({ path: path, directory: Directory.Cache });
      })
      .finally(() => {
        loading.dismiss();
      });
  }
}
