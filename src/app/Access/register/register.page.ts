import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    rut: '',
    email: '',
    firstname: '',
    lastname: '',
    birthdate: new Date(),
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router, private authenticatorService: AuthenticatorService) {
  }

  ngOnInit() {
  }

  showPassword = false;
  showConfirmPassword = false;
  passwordtoggleicon = 'eye';

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordtoggleicon == 'eye') {
      this.passwordtoggleicon = 'eye-off'
    }
    else {
      this.passwordtoggleicon = 'eye'
    }
  }

  passwordConfirmtoggleicon = 'eye';

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;

    if (this.passwordConfirmtoggleicon == 'eye') {
      this.passwordConfirmtoggleicon = 'eye-off'
    }
    else {
      this.passwordConfirmtoggleicon = 'eye'
    }
  }

  passwordFeedback = '';

  validarPassword() {
    if (this.user.password.length != 0) {
      if (this.user.password.length >= 8 && this.user.password.length <= 24) {
        this.passwordFeedback = '';

        let navigationExtras: NavigationExtras = {
          /*state: { // para registrar los datos del usuario
            username: this.user.username,
            password: this.user.password,
          },*/
        };

        setTimeout(() => {
          this.router.navigate(['/home'], navigationExtras);
        }, 1000);
      } 
      else {
        this.passwordFeedback = 'La contraseña debe tener entre 8 y 24 caracteres.';
      }
    }
    else {
      this.passwordFeedback = 'La contraseña está vacia';
    }
  }

  registerUser() {
    this.authenticatorService.createUser(
      this.user.rut,
      this.user.email,
      this.user.firstname,
      this.user.lastname,
      this.user.birthdate,
      this.user.password
    );

    console.log("SE HA REGISTRADO AL USUARIO: " + this.user.email);
  }
}
