import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  generarQr() {
    this.router.navigate(['/perfil/qr-view']);
  }
}