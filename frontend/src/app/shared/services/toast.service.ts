import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
    exiting?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastIdCounter = 0;
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    constructor() { }

    show(message: string, type: 'success' | 'error' | 'info' = 'success') {
        const id = this.toastIdCounter++;

        const toasts = [
            ...this.toastsSubject.value,
            { id, message, type }
        ];

        // Limit to 3 toasts at a time
        if (toasts.length > 3) {
            toasts.shift(); // Remove the oldest toast
        }

        this.toastsSubject.next(toasts);

        // Auto remove after 3 seconds
        setTimeout(() => {
            this.markForRemoval(id);
        }, 3000);
    }

    markForRemoval(id: number) {
        const toasts = this.toastsSubject.value.map(toast =>
            toast.id === id ? { ...toast, exiting: true } : toast
        );
        this.toastsSubject.next(toasts);

        // Remove after animation
        setTimeout(() => {
            this.remove(id);
        }, 500);
    }

    remove(id: number) {
        const toasts = this.toastsSubject.value.filter(toast => toast.id !== id);
        this.toastsSubject.next(toasts);
    }
} 