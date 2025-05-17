import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'success-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="success-toast" [ngClass]="{
      'success-toast-success': type === 'success',
      'success-toast-error': type === 'error',
      'success-toast-info': type === 'info',
      'exiting': exiting
    }">
      <img
        *ngIf="type === 'success'"
        src="icons/ic_fluent_checkmark_circle_20_regular.svg"
        class="success-toast-icon"
        alt="Éxito"
      />
      <img
        *ngIf="type === 'error'"
        src="icons/ic_fluent_dismiss_circle_20_regular.svg"
        class="success-toast-icon"
        alt="Error"
      />
      <img
        *ngIf="type === 'info'"
        src="icons/ic_fluent_info_20_regular.svg"
        class="success-toast-icon"
        alt="Info"
      />
      <span class="success-toast-message">{{ message }}</span>
    </div>
  `,
    styleUrls: ['./success-toast.component.css']
})
export class SuccessToastComponent implements OnInit {
    @Input() message: string = '¡Operación completada con éxito!';
    @Input() type: 'success' | 'error' | 'info' = 'success';
    @Input() exiting: boolean = false;
    @Output() close = new EventEmitter<void>();

    ngOnInit() {
        setTimeout(() => {
            this.onClose();
        }, 5000); // Auto close after 5 seconds
    }

    onClose() {
        this.close.emit();
    }
} 