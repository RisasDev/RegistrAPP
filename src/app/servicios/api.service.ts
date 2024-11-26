import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://registrapp.risas.me/api/users';

  // Si necesitas agregar cabeceras de autenticación (por ejemplo, un token de autorización)
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Reemplaza con tu token real
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Obtener un usuario específico por email
  getUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${email}`, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Verificar si un usuario está registrado (basado en su email)
  isRegistered(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getUser(email).subscribe(
        (response) => {
          if (response) {  // Si la respuesta no es nula
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);  // Rechazar la promesa si ocurre un error
        }
      );
    });
  }

  // Crear un nuevo usuario
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Función para manejar errores de las solicitudes HTTP
  private handleError(error: HttpErrorResponse) {
    // Si ocurre un error de red (sin conexión o no se puede acceder al servidor)
    if (error.status === 0) {
      console.error('Ocurrió un error de red:', error.error);
    } else {
      // Si la respuesta de la API es con un error, mostrar código de error y mensaje
      console.error(`Backend devolvió el código ${error.status}, ` + `el cuerpo fue: ${error.error}`);
    }
    return throwError('Algo salió mal; por favor intenta nuevamente más tarde.');
  }
}