import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// Define the SuccessToast interface directly in this file to avoid import issues
export interface SuccessToast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    autoHide: boolean;
    duration: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    // Use BehaviorSubject so new subscribers get the current state
    private toastsSubject = new BehaviorSubject<SuccessToast[]>([]);
    public toasts$ = this.toastsSubject.asObservable();

    // Used for generating unique IDs
    private lastId = 0;

    /**
     * Show a success toast notification
     * @param message The message to display
     * @param duration Optional duration in ms (default: 5000ms)
     */
    showSuccess(message: string, duration: number = 5000): void {
        this.show(message, 'success', duration);
    }

    /**
     * Show an error toast notification
     * @param message The message to display
     * @param duration Optional duration in ms (default: 5000ms)
     */
    showError(message: string, duration: number = 5000): void {
        this.show(message, 'error', duration);
    }

    /**
     * Show an info toast notification
     * @param message The message to display
     * @param duration Optional duration in ms (default: 5000ms)
     */
    showInfo(message: string, duration: number = 5000): void {
        this.show(message, 'info', duration);
    }

    /**
     * Show a warning toast notification
     * @param message The message to display
     * @param duration Optional duration in ms (default: 5000ms)
     */
    showWarning(message: string, duration: number = 5000): void {
        this.show(message, 'warning', duration);
    }

    /**
     * Show a toast notification
     * @param message The message to display
     * @param type The type of toast
     * @param duration Optional duration in ms (default: 5000ms)
     */
    private show(message: string, type: 'success' | 'error' | 'info' | 'warning', duration: number = 5000): void {
        const id = this.generateId();

        const toast: SuccessToast = {
            id,
            message,
            type,
            autoHide: true,
            duration
        };

        const currentToasts = this.toastsSubject.value;
        this.toastsSubject.next([...currentToasts, toast]);
    }

    /**
     * Remove a toast by id
     * @param id The ID of the toast to remove
     */
    remove(id: string): void {
        const currentToasts = this.toastsSubject.value;
        this.toastsSubject.next(currentToasts.filter(toast => toast.id !== id));
    }

    /**
     * Generate a unique ID for toasts
     */
    private generateId(): string {
        return `toast-${Date.now()}-${this.lastId++}`;
    }
} 