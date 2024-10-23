import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  constructor(private router: Router) { } // Inyecta el Router

  ngOnInit() {
  }

  generarQr() {
    // Navega a la vista del QR
    this.router.navigate(['/perfil/qr-view']);
  }
}