import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {
  user = {} as any;
  qrHours: number = 0;
  qrMinutes: number = 0;

  constructor(private router: Router) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      user: any;
    };

    this.user = state.user;
  }

  ngOnInit() {}

  generarQr() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
        qrHours: this.qrHours,
        qrMinutes: this.qrMinutes,
      },
    };

    this.router.navigate(['/perfil/qr-view'], navigationExtras);
  }
}
