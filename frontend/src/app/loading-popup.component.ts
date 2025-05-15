import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-popup',
  standalone: true,
  imports: [],
  template: `
    <div class="popup-backdrop">
      <div class="popup-content">
        <div class="loader"></div>
        <div class="popup-message">{{ message }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./loading-popup.component.css']
})
export class LoadingPopupComponent {
  @Input() message: string = 'Cargando, por favor espere...';
}
