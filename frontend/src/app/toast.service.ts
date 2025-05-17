import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error';
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  private toastId = 0;
  public toasts$ = this.toastsSubject.asObservable();

  show(message: string, type: ToastType = 'success', duration = 6000, fadeoutDuration = 1500) {
    const id = ++this.toastId;
    const toast: Toast = { id, message, type };
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);
    setTimeout(() => {
      // Marca como saliendo
      const currentToasts = this.toastsSubject.value;
      const idx = currentToasts.findIndex(t => t.id === id);
      if (idx !== -1) {
        const exitingToast = { ...currentToasts[idx], exiting: true };
        const updated = [...currentToasts];
        updated[idx] = exitingToast;
        this.toastsSubject.next(updated);
        // Elimina después del fadeout
        setTimeout(() => this.remove(id), fadeoutDuration);
      }
    }, duration);
  }

  remove(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }
}
