import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

   /* Objeto JSON para usuario */
  user = {
    username: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
