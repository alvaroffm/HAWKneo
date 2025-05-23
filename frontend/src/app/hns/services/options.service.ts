import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface OptionItem {
    value: string;
    label: string;
}

export interface ResetResponse {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class OptionsService {
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient) { }

    /**
     * Obtiene las opciones de fuentes de la base de datos
     */
    getFuentes(): Observable<OptionItem[]> {
        return this.http.get<OptionItem[]>(`${this.apiUrl}/options/fuentes`)
            .pipe(
                catchError(this.handleError<OptionItem[]>('getFuentes', []))
            );
    }

    /**
     * Obtiene las opciones de clases de la base de datos
     */
    getClases(): Observable<OptionItem[]> {
        return this.http.get<OptionItem[]>(`${this.apiUrl}/options/clases`)
            .pipe(
                catchError(this.handleError<OptionItem[]>('getClases', []))
            );
    }

    /**
     * Obtiene las opciones de versiones de la base de datos
     */
    getVersiones(): Observable<OptionItem[]> {
        return this.http.get<OptionItem[]>(`${this.apiUrl}/options/versiones`)
            .pipe(
                catchError(this.handleError<OptionItem[]>('getVersiones', []))
            );
    }

    /**
     * Reinicia la base de datos SQLite con datos iniciales
     */
    resetDatabase(): Observable<ResetResponse> {
        return this.http.post<ResetResponse>(`${this.apiUrl}/options/reset-database`, {})
            .pipe(
                catchError(this.handleError<ResetResponse>('resetDatabase', { success: false, message: 'Error al reiniciar la base de datos' }))
            );
    }

    /**
     * Manejo de errores HTTP
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} error: ${error.message}`);
            // Devolvemos un resultado vacío para seguir funcionando
            return new Observable<T>(subscriber => {
                subscriber.next(result as T);
                subscriber.complete();
            });
        };
    }
} 