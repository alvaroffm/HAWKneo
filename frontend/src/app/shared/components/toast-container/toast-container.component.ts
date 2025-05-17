import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, SuccessToast } from '../../../core/services/toast.service';
import { SuccessToastComponent } from '../success-toast/success-toast.component';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css'],
  standalone: true,
  imports: [CommonModule, SuccessToastComponent]
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: SuccessToast[] = [];
  private toastSubscription?: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }

  removeToast(id: string): void {
    this.toastService.remove(id);
  }
} 