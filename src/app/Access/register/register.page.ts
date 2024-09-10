import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    username: '',
    rut: '',
    name: '',
    lastname: '',
    birthdate: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {
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
}
