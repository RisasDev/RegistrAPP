import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    username: '',
    name: '',
    lastname: '',
    birthdate: '',
    password: '',
    confirmPassword: ''
  };

  constructor() { }

  ngOnInit() {
  }

  showPassword = false;
  showConfirmPassword = false;
  passwordtoggleicon = 'eye'

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordtoggleicon == 'eye') {
      this.passwordtoggleicon = 'eye-off'
    } 
    else {
      this.passwordtoggleicon = 'eye'
    }
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;

    if (this.passwordtoggleicon == 'eye') {
      this.passwordtoggleicon = 'eye-off'
    } 
    else {
      this.passwordtoggleicon = 'eye'
    }
  }
}
