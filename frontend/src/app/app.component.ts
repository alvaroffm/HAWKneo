import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoadingPopupComponent } from './loading-popup.component';
import { SuccessToastComponent } from './success-toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class AppComponent {
  public title = 'HAWKneo';
  message = '';
  showSettingsMenu = false;
  showLoadingPopup = false;
  loadingMessage = 'Obteniendo datos de HNS...';
  showSuccessToast = false;
  successMessage = '¡Operación completada con éxito!';
  toastTimeout: any = null;

  constructor(private http: HttpClient, private router: Router) { }

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

  toastType: 'success' | 'error' = 'success';
  showToast(msg: string, type: 'success' | 'error') {
    this.successMessage = msg;
    this.toastType = type;
    this.showSuccessToast = true;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }

  getRDR() {
    this.http.get<{ message: string }>('http://localhost:8000/rdr').subscribe(res => {
      this.message = res.message;
    });
  }
}

