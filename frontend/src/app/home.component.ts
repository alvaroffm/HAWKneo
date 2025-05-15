import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingPopupComponent } from './loading-popup.component';
import { SuccessToastComponent } from './success-toast.component';

@Component({
  selector: 'home-page',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [LoadingPopupComponent, SuccessToastComponent, CommonModule]
})
export class HomeComponent {
  message = '';
  showSuccessToast = false;
  successMessage = '';
  toastType: 'success' | 'error' = 'success';
  showLoadingPopup = false;
  loadingMessage = 'Cargando...';
  toastTimeout: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  getRDS() {
    this.showLoadingPopup = true;
    this.http.get<{ ok: boolean, message: string }>('http://localhost:8000/rds').subscribe({
      next: res => {
        this.showLoadingPopup = false;
        if (res.ok) {
          this.message = res.message;
          this.showToast(res.message, 'success');
          setTimeout(() => {
            this.router.navigate(['/hns']);
          }, 800);
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

  getRDR() {
    this.showLoadingPopup = true;
    this.http.get<{ message: string }>('http://localhost:8000/rdr').subscribe({
      next: res => {
        this.showLoadingPopup = false;
        this.message = res.message;
        this.showToast(res.message, 'success');
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
}
