import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  connnectionStatus: boolean = false;

  constructor(private apiService: ApiService) { }

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
    
    this.apiService.createUser(newUser).subscribe((response) => {
      console.log("Usuario creado", response);
    });
  }

  async loginUser(email: any, password: any) {
    return new Promise((resolve, reject) => {
      this.apiService.getUser(email).subscribe(
        (response) => {
          if (response != null) {
            if (response.email == email && response.password == password) {
              resolve(true);

              this.connnectionStatus = true;
            }
            else {
              resolve(false);
            }
          }
          else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async createClass(id: String, profesor: String, fecha_inicio: Date, fecha_termino: Date, alumnos: any[], estado: boolean) {
    const newClass = {
      id: id,
      profesor: profesor,
      fecha_inicio: fecha_inicio,
      fecha_termino: fecha_termino,
      alumnos: alumnos,
      estado: estado
    };

    this.apiService.createClass(newClass).subscribe((response) => {
      console.log("Clase creada", response);
    });
  }

  isConected() {
    return this.connnectionStatus;
  }
}
