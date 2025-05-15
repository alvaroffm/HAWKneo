import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingPopupComponent } from './loading-popup.component';
import { SuccessToastComponent } from './success-toast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hns-submodule',
  standalone: true,
  templateUrl: './hns-submodule.component.html',
  styleUrls: ['./hns-submodule.component.css'],
  imports: [LoadingPopupComponent, SuccessToastComponent, CommonModule]
})
export class HnsSubmoduleComponent {
  showLoadingPopup = false;
  loadingMessage = 'Cargando...';
  showSuccessToast = false;
  successMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any = null;
  message = '';

  constructor(private router: Router, private http: HttpClient) {}

  getRDS() {
    this.showLoadingPopup = true;
    this.http.get<{ ok: boolean, message: string }>('http://localhost:8000/rds').subscribe({
      next: res => {
        this.showLoadingPopup = false;
        if (res.ok) {
          this.message = res.message;
          this.showToast(res.message, 'success');
        } else {
          this.message = '';
          this.showToast(res.message, 'error');
        }
      },
      error: err => {
        this.showLoadingPopup = false;
        this.message = '';
        this.showToast('Error de conexión con el backend', 'error');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error') {
    this.successMessage = message;
    this.toastType = type;
    this.showSuccessToast = true;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.showSuccessToast = false;
    }, 2000);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
