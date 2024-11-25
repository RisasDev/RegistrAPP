import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../../../servicios/authenticator.service';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  qrHours: number = 0;
  qrMinutes: number = 0;

  constructor(private router: Router, private authenticatorService: AuthenticatorService) { }

  ngOnInit() {
  }

  generarQr() {
    this.router.navigate(['/perfil/qr-view']);
  }

  logout() {
    // Llama al servicio para cerrar sesión
    this.authenticatorService.logoutUser();

    // Redirige al usuario a la página de login
    this.router.navigate(['/home']);
  }
}