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
      console.log(response);
    });
  }

  async loginUser(rut: any, password: any) {
    const user = await this.getUser(rut);

    if (user == null) return false;

    if (user.rut == rut && user.password == password) {
      this.connnectionStatus = true;
      return true;
    }
    else {
      return false;
    }
  }

  async getUser(rut: any): Promise<any> {
    console.log("rut: " + rut);
    var user = null;

    this.apiService.getUsers().subscribe((response) => {
      response.forEach((element: any) => {
        if (element.rut == rut) {
          user = element;
        }
      });
    });

    console.log("user: " + user);

    return user;
  }

  isRegistered(rut: any) {
    // Almacenamos el resultado de getUser en una variable
    const user = this.getUser(rut);
    console.log(user);
  
    // Verificamos si es undefined o null
    const isUndefined = user === undefined || user === null;
  
    // Devolvemos si es distinto de null (o undefined en este caso)
    return user != null;
  }
  

  isConected() {
    return this.connnectionStatus;
  }
}
