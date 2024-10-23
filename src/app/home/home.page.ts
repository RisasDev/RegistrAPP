import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthenticatorService } from '../servicios/authenticator.service';
import { ApiService } from '../servicios/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login = {
    email: '',
    password: '',
  };

  user = {} as any;

  mensaje = '';
  spinner = false;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private authenticatorService: AuthenticatorService,
    private apiService: ApiService
  ) {}

  ngAfterContentInit() {
    this.animarTitulo();
  }

  animarTitulo() {
    const mainTitle = document.querySelector('#main-title') as HTMLElement;
    const animation = this.animationController
      .create()
      .addElement(mainTitle)
      .duration(2000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(-100px)', 'translateX(400px)');

    animation.play();
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  async validar() {
    if (
      await this.authenticatorService.loginUser(
        this.login.email,
        this.login.password
      )
    ) {
      this.mensaje = 'Conexion exitosa';

      this.apiService.getUser(this.login.email).subscribe((response) => {
        this.user = response;

        let navigationExtras: NavigationExtras = {
          state: {
            user: this.user,
          },
        };

        this.cambiarSpinner();

        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = '';
        }, 3000);
      });
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }

  showPassword = false;
  passwordtoggleicon = 'eye';

  togglepassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordtoggleicon == 'eye') {
      this.passwordtoggleicon = 'eye-off';
    } else {
      this.passwordtoggleicon = 'eye';
    }
  }
}
