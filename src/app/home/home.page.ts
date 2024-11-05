import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthenticatorService } from '../servicios/authenticator.service';
import { ApiService } from '../servicios/api.service';

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
      .duration(3000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(-100px)', 'translateX(100%)');

    animation.play();
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  esContrasenaRobusta(password: string): boolean {
    const longitudMinima = 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= longitudMinima &&
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneEspecial
    );
  }

  async validar() {
    // Validación del correo y contraseña
    if (this.login.email.length === 0) {
      this.mensaje = 'Correo vacío';
      return;
    }
    if (this.login.password.length === 0) {
      this.mensaje = 'Contraseña vacía';
      return;
    }
    if (!this.esContrasenaRobusta(this.login.password)) {
      this.mensaje = 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.';
      return;
    }

    // Extraemos el dominio del correo después del '@'
    const domain = this.login.email.split('@')[1];

    if (domain !== 'duocuc.cl' && domain !== 'profesor.duoc.cl' && domain !== 'cetecom.duoc.cl') {
      this.mensaje = 'Dominio no válido. Debe ser "duocuc.cl", "profesor.duoc.cl" o "cetecom.duoc.cl"';
      return;
    }

    // Verificamos si la combinación de correo y contraseña es válida
    const loginValido = await this.authenticatorService.loginUser(this.login.email, this.login.password);
    if (!loginValido) {
      this.mensaje = 'Usuario o contraseña incorrectos';
      return;
    }

    // Si la combinación es válida, se autentica al usuario
    this.mensaje = 'Conexión exitosa';

    // Obtenemos los datos del usuario desde la API
    this.apiService.getUser(this.login.email).subscribe((response) => {
      this.user = response;

      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user,
        },
      };

      this.cambiarSpinner();

      // Redirigir a la vista correspondiente según el dominio del correo
      setTimeout(() => {
        if (domain === 'duocuc.cl') {
          this.router.navigate(['/perfil/alumno'], navigationExtras); // Redirige a la vista Alumno
        } 
        else if (domain === 'profesor.duoc.cl') {
            this.router.navigate(['/perfil/docente'], navigationExtras); // Redirige a la vista Docente
        } 
        else if (domain === 'cetecom.duoc.cl') {
            this.router.navigate(['/admin'], navigationExtras); // Redirige a la vista Admin
        }
        this.cambiarSpinner();
        this.mensaje = '';
      }, 3000);

    });
  }

  showPassword = false;
  passwordtoggleicon = 'eye';

  togglepassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordtoggleicon = this.passwordtoggleicon === 'eye' ? 'eye-off' : 'eye';
  }
}
