import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastContainerComponent]
})
export class AppComponent {
  title = 'HAWKneo';

  constructor(private toastService: ToastService) { }

  toggleSettings() {
    // Display toast when settings button is clicked
    this.toastService.showSuccess('Configuración global disponible');
  }
}

