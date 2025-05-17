import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { LoadingPopupComponent } from '../shared/components/loading-popup/loading-popup.component';
import { ToastContainerComponent } from '../shared/components/toast-container/toast-container.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule, HttpClientModule, LoadingPopupComponent, ToastContainerComponent]
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
    ) { }

    ngOnInit() {
        // Removing test toasts on app initialization
    }

    toggleSettings() {
        // Show loading popup when settings button is clicked
        this.showLoadingPopup = true;
        this.loadingMessage = 'Cargando configuración...';

        // Simulate loading data (3 seconds)
        setTimeout(() => {
            this.showLoadingPopup = false;
            this.toastService.show('Configuración cargada correctamente', 'success');
        }, 3000);
    }

    toggleSettingsMenu() {
        this.showSettingsMenu = !this.showSettingsMenu;
    }

    navigateToModule(module: string) {
        // Navigate to module without showing loading popup
        this.router.navigate([module]);
    }

    getRDS() {
        this.toastService.show('boton HNS pulsado', 'info');
        this.showLoadingPopup = true;
        this.loadingMessage = 'Obteniendo datos de HNS...';
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