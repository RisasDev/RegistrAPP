import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  // URL de tu backend
  private emailUrl = 'http://144.217.243.109:6000/enviar-correo';

  // Opciones de encabezado HTTP
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) {}

  // Método para enviar un correo (GET)
  sendEmail(nombreProfesor: string, emailProfesor: string, tipo: 'iniciar' | 'terminar'): Observable<any> {
    // Estructura de la URL con los parámetros requeridos
    const url = `${this.emailUrl}/${tipo}?nombreProfesor=${encodeURIComponent(nombreProfesor)}&emailProfesor=${encodeURIComponent(emailProfesor)}`;

    console.log('Enviando correo:', url);

    // Hacer la solicitud GET al servidor
    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Función para manejar errores de las solicitudes HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ocurrió un error de red:', error.error);
    } else {
      console.error(`Backend devolvió el código ${error.status}, ` + `el cuerpo fue: ${error.error}`);
    }
    return throwError('Algo salió mal; por favor intenta nuevamente más tarde.');
  }
}
