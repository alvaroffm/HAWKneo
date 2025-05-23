import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../core/services/toast.service';
import { CommonModule } from '@angular/common';
import { LoadingPopupComponent } from '../shared/components/loading-popup/loading-popup.component';
import { ToastContainerComponent } from '../shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    LoadingPopupComponent,
    ToastContainerComponent,
  ],
})
export class HomeComponent implements OnInit {
  title = 'HAWKneo';
  message = '';
  showSettingsMenu = false;
  showLoadingPopup = false;
  loadingMessage = 'Cargando configuración...';

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  toggleSettings() {
    this.toastService.showInfo('Este botón todavía no está implementado');
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  toggleDocs(event: Event) {
    event.preventDefault();
    this.toastService.showError(
      'La documentación no está disponible en este momento'
    );
  }

  navigateToModule(module: string) {
    this.router.navigate([module]);
  }

  getRDS() {
    this.toastService.showSuccess('boton HNS pulsado');
    this.showLoadingPopup = true;
    this.loadingMessage = 'Obteniendo datos de HNS...';
    this.http
      .get<{ ok: boolean; message: string }>('http://localhost:8000/rds')
      .subscribe({
        next: (res) => {
          this.showLoadingPopup = false;
          if (res.ok) {
            this.message = res.message;
            this.toastService.showSuccess(res.message);
          } else {
            this.message = '';
            this.toastService.showError(res.message);
          }
        },
        error: (err) => {
          this.message = '';
          const backendMsg =
            err?.error?.message || 'Error al obtener datos de HNS.';
          this.showLoadingPopup = false;
          this.toastService.showError(backendMsg);
        },
      });
  }

  getRDR() {
    this.http
      .get<{ message: string }>('http://localhost:8000/rdr')
      .subscribe((res) => {
        this.message = res.message;
      });
  }
}
