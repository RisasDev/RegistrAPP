import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  connnectionStatus: boolean = false;

  constructor(private apiService: ApiService) {
    const isConnected = localStorage.getItem('isConnected') === 'true';
    this.connnectionStatus = isConnected;
   }

  async createUser(rut: Number, dvrut: String, email: String, firstname: String, lastname: String, birthdate: Date, password: String, role: String) {
    const newUser = { 
      rut: rut, 
      dvrut: dvrut,
      email: email,
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      password: password,
      role: role
    };
    
    this.apiService.createUser(newUser).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente', response);
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
      }
    });       
  }

  async loginUser(email: any, password: any) {
    return new Promise((resolve, reject) => {
      this.apiService.getUser(email).subscribe(
        (response) => {
          if (response != null) {
            if (response.email === email && response.password === password) {
              this.connnectionStatus = true;
  
              // Guardar estado en localStorage
              localStorage.setItem('isConnected', 'true');
              localStorage.setItem('userEmail', email); // Guardar también el email si es necesario
  
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }  

  isConected() {
    return this.connnectionStatus;
  }

  logoutUser() {
    this.connnectionStatus = false;
  
    // Limpia el estado en localStorage
    localStorage.removeItem('isConnected');
    localStorage.removeItem('userEmail');
  
    console.log('Sesión cerrada');
  }  

}
