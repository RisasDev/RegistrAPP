import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(private apiService: ApiService) { }

  async createUser(rut: String, email: String, firstname: String, lastname: String, birthdate: Date, password: String) {
    const newUser = { 
      rut: rut, 
      email: email,
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      password: password
    };
    
    this.apiService.createUser(newUser).subscribe((response) => {
      console.log(response);
    });
  }
}
