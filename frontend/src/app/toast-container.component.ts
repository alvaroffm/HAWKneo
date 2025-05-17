import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { SuccessToastComponent } from './success-toast.component';

@Component({
  selector: 'toast-container',
  standalone: true,
  imports: [CommonModule, SuccessToastComponent],
  template: `
    <div class="toast-container">
      <ng-container *ngIf="toasts$ | async as toasts">
        <success-toast *ngFor="let toast of toasts.slice().reverse()"
          [message]="toast.message"
          [type]="toast.type"
          (click)="remove(toast.id)">
        </success-toast>
      </ng-container>
    </div>
  `,
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent {
  toasts$;
  constructor(public toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }
  remove(id: number) { this.toastService.remove(id); }
}
