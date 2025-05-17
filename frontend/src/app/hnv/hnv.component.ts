import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { ModuleLayoutComponent, Step } from '../shared/module-layout/module-layout.component';

@Component({
    selector: 'app-hnv',
    templateUrl: './hnv.component.html',
    styleUrls: ['./hnv.component.css'],
    standalone: true,
    imports: [CommonModule, ModuleLayoutComponent]
})
export class HnvComponent implements OnInit {
    loading: boolean = false;
    message: string = '';
    showLoadingPopup: boolean = false;
    loadingMessage: string = 'Validando calidad de datos...';

    // Definición de los pasos para este módulo
    steps: Step[] = [
        { id: 1, name: 'Preparar', icon: 'ic_fluent_document_catch_up_20_regular.svg', active: true },
        { id: 2, name: 'Validar', icon: 'ic_fluent_checkmark_circle_20_regular.svg' },
        { id: 3, name: 'Analizar', icon: 'ic_fluent_data_histogram_20_regular.svg' },
        { id: 4, name: 'Corregir', icon: 'ic_fluent_data_funnel_20_regular.svg' },
        { id: 5, name: 'Exportar', icon: 'ic_fluent_database_20_regular.svg' }
    ];

    constructor(private http: HttpClient, private toastService: ToastService) { }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.loading = true;
        // No longer showing the loading popup

        // Simular una petición HTTP
        setTimeout(() => {
            this.loading = false;
            this.message = 'Validación de datos HNV completada. Calidad del conjunto: 98.5%. Última actualización: ' + new Date().toLocaleString();

            // Mostrar toast de éxito
            this.toastService.show('Datos de validación cargados', 'success');
        }, 2000);

        // En un caso real, usaríamos:
        /*
        this.http.get<{ message: string }>('http://localhost:8000/rdr').subscribe({
            next: res => {
                this.loading = false;
                this.message = res.message;
                this.toastService.show('Datos de validación cargados', 'success');
            },
            error: err => {
                this.loading = false;
                this.message = '';
                const backendMsg = err?.error?.message || 'Error al obtener datos de validación.';
                this.toastService.show(backendMsg, 'error');
            }
        });
        */
    }
} 