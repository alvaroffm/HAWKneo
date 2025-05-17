import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'success-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="success-toast" [ngClass]="{'success-toast-error': type === 'error'}">
      <span class="success-toast-message">{{ message }}</span>
    </div>
  `,
  styleUrls: ['./success-toast.component.css']
})
export class SuccessToastComponent {
  @Input() message: string = '¡Operación completada con éxito!';
  @Input() type: 'success' | 'error' = 'success';
}

