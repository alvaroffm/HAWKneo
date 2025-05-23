import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    /**
     * Perform a GET request
     * @param path The endpoint path
     * @param params Optional query parameters
     * @returns Observable with the response
     */
    get<T>(path: string, params: any = {}): Observable<T> {
        const options = {
            params: new HttpParams({ fromObject: params }),
            headers: this.getHeaders()
        };

        return this.http.get<T>(`${this.apiUrl}/${path}`, options)
            .pipe(catchError(this.handleError));
    }

    /**
     * Perform a POST request
     * @param path The endpoint path
     * @param body The request body
     * @returns Observable with the response
     */
    post<T>(path: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${path}`, body, { headers: this.getHeaders() })
            .pipe(catchError(this.handleError));
    }

    /**
     * Perform a PUT request
     * @param path The endpoint path
     * @param body The request body
     * @returns Observable with the response
     */
    put<T>(path: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${path}`, body, { headers: this.getHeaders() })
            .pipe(catchError(this.handleError));
    }

    /**
     * Perform a DELETE request
     * @param path The endpoint path
     * @returns Observable with the response
     */
    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${path}`, { headers: this.getHeaders() })
            .pipe(catchError(this.handleError));
    }

    /**
     * Get standard HTTP headers
     * @returns HttpHeaders object
     */
    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        return headers;
    }

    /**
     * Handle HTTP errors
     * @param error The HTTP error
     * @returns An error Observable
     */
    private handleError(error: any): Observable<never> {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
} 