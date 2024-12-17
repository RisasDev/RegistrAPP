import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUserUrl = 'https://registrapp.risas.me/api/users';
  private apiClassUrl = 'https://registrapp.risas.me/api/clases';

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
    return this.http.get(this.apiUserUrl, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Obtener un usuario específico por email
  getUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUserUrl}/${email}`, this.httpOptions).pipe(
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
    return this.http.post(this.apiUserUrl, user, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Crear una nueva clase
  createClass(clase: any): Observable<any> {
    return this.http.post(this.apiClassUrl, clase, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Obtener todas las clases
  getClasses(): Observable<any> {
    return this.http.get(this.apiClassUrl, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Obtener una clase específica por ID
  getClass(id: string): Observable<any> {
    return this.http.get(`${this.apiClassUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Actualizar una clase existente
  updateClass(id: string, clase: any): Observable<any> {
    return this.http.put(`${this.apiClassUrl}/${id}`, clase, this.httpOptions).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Si la clase esta disponible mediante el estado que es "estado"
  isClassAvailable(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getClass(id).subscribe(
        (response) => {
          if (response) {  // Si la respuesta no es nula
            resolve(response.estado);
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