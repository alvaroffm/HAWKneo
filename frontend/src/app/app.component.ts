import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoadingPopupComponent } from './loading-popup.component';
import { SuccessToastComponent } from './success-toast.component';
import { ToastService } from './toast.service';
import { ToastContainerComponent } from './toast-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, LoadingPopupComponent, ToastContainerComponent]
})
export class AppComponent {
  ngOnInit() {
    this.testMultipleToasts();
  }

  testMultipleToasts() {
    this.toastService.show('Operación exitosa', 'success');
    this.toastService.show('Algo salió mal', 'error');
    this.toastService.show('Tarea completada', 'success');
  }

  public title = 'HAWKneo';
  message = '';
  showSettingsMenu = false;
  showLoadingPopup = false;
  loadingMessage = 'Obteniendo datos de HNS...';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  toggleSettingsMenu() {
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  getRDS() {
    this.showLoadingPopup = true;
    this.loadingMessage = 'Obteniendo datos de HNS...';
    this.http.get<{ ok: boolean, message: string }>('http://localhost:8000/rds').subscribe({
      next: res => {
        this.showLoadingPopup = false;
        if (res.ok) {
          this.message = res.message;
          this.showToast(res.message, 'success');
          setTimeout(() => {
            this.router.navigate(['/hns']);
          }, 800); // Espera breve para mostrar el toast
        } else {
          this.message = '';
          this.showToast(res.message, 'error');
        }
      },
      error: err => {
        this.message = '';
        const backendMsg = err?.error?.message || 'Error al obtener datos de HNS.';
        this.showLoadingPopup = false;
        this.showToast(backendMsg, 'error');
      }
    });
  }

  showToast(msg: string, type: 'success' | 'error') {
    this.toastService.show(msg, type);
  }

  getRDR() {
    this.http.get<{ message: string }>('http://localhost:8000/rdr').subscribe(res => {
      this.message = res.message;
    });
  }
}

