import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  constructor(private router: Router, private authenticatorService: AuthenticatorService, private toastController: ToastController) {
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

  validarPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return !regex.test(password);
  }

  registerUser() {
    var rut = this.user.rut.replace(' ', '');

    if (!rut) {
      this.showAlert('RUT');
      return;
    }
    else if (!this.validateRut(rut)) {
      this.showAlert('RUT', 'El RUT ingresado no es válido.');
      return;
    }
    else if (this.authenticatorService.isRegistered(rut)) {
      this.showAlert('RUT', 'El RUT ingresado ya está registrado.');
      return;
    }

    var email = this.user.email.replace(' ', '');

    if (!email) {
      this.showAlert('Email');
      return;
    }
    else if (!email.endsWith("@duocuc.cl") && !email.endsWith("@profesor.duoc.cl")) {
      this.showAlert('Email', 'El email ingresado no es institucional.');
      return;
    }

    var firstname = this.user.firstname.replace(' ', '');

    if (!firstname) {
      this.showAlert('Nombre');
      return;
    }

    var lastname = this.user.lastname.replace(' ', '');

    if (!lastname) {
      this.showAlert('Apellido');
      return;
    }

    var birthdate = this.user.birthdate;

    if (!birthdate) {
      this.showAlert('Fecha de Nacimiento');
      return;
    }

    var password = this.user.password.replace(' ', '');

    if (this.validarPassword(password)) {
      this.showAlert('Contraseña', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
      return;
    }

    var confirmPassword = this.user.confirmPassword.replace(' ', '');

    if (password != confirmPassword) {
      this.showAlert('Confirmar Contraseña', 'Las contraseñas no coinciden.');
      return;
    }

    rut = rut
      .replace(' ', '')
      .replace(/\./g, '')
      .replace(/-/g, '')
      .slice(0, -1);

    var dvrut = rut.slice(-1).replace(' ', '');
    var role = email.endsWith("@duocuc.cl") ? 'Estudiante' : 'Profesor';

    this.authenticatorService.createUser(
      Number(rut),
      dvrut,
      email,
      firstname,
      lastname,
      birthdate,
      password,
      role
    );

    this.showRegisterAlert();

    let navigationExtras: NavigationExtras = {
      state: {
        rut: rut,
        firstname: firstname,
        lastname: lastname,
      },
    };

    setTimeout(() => {
      this.router.navigate(['/home'], navigationExtras);
    }, 1000);
  }

  async getUser() {
    var rut = this.user.rut;
    rut = this.truncateRut(rut).slice(0, -1);

    this.authenticatorService.getUser(rut);
    this.authenticatorService.isRegistered(rut);
  }

  async showRegisterAlert() {
    const toast = await this.toastController.create({
      message: 'Usuario registrado con éxito.',
      duration: 3000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async showAlert(campo: string, message?: string) {
    if (!message) {
      message = `Error en el campo: ${campo}`;
    }
    else {
      message = message;
    }

    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  validateRut(rut: string): boolean {
    const cleanRut = this.truncateRut(rut).toUpperCase();
  
    if (cleanRut.length < 2) return false;
  
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
  
    if (!/^\d+$/.test(body)) return false;

    let sum = 0;
    let multiplier = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i], 10) * multiplier;
      multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }
  
    const calculatedDv = 11 - (sum % 11);
    const expectedDv = calculatedDv === 11 ? '0' : calculatedDv === 10 ? 'K' : calculatedDv.toString();
  
    return expectedDv === dv;
  }

  truncateRut(rut: string): string {
    return rut.replace(/\./g, '').replace(/-/g, '').replace(' ', '');
  }
}
