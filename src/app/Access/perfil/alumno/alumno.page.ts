import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  user = {} as any;

  constructor(private router: Router) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      user: any;
    };

    this.user = state.user;
  }

  ngOnInit() {
  }

  escanearQr() {
    console.log('Abriendo camara para validar QR...');
  }
}