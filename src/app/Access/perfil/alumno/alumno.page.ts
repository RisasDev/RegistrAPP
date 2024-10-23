import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  escanearQr() {
    // Lógica para escanear un QR
    console.log('Escanear QR');
  }
}