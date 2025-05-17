import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { ModuleLayoutComponent, Step } from '../shared/module-layout/module-layout.component';

@Component({
    selector: 'app-hnr',
    templateUrl: './hnr.component.html',
    styleUrls: ['./hnr.component.css'],
    standalone: true,
    imports: [CommonModule, ModuleLayoutComponent]
})
export class HnrComponent implements OnInit {
    loading: boolean = false;
    message: string = '';
    showLoadingPopup: boolean = false;
    loadingMessage: string = 'Procesando datos de reporte...';

    // Definición de los pasos para este módulo
    steps: Step[] = [
        { id: 1, name: 'Fuentes', icon: 'ic_fluent_document_catch_up_20_regular.svg', active: true },
        { id: 2, name: 'Datos', icon: 'ic_fluent_data_histogram_20_regular.svg' },
        { id: 3, name: 'Análisis', icon: 'ic_fluent_database_20_regular.svg' },
        { id: 4, name: 'Reportes', icon: 'ic_fluent_notebook_20_regular.svg' }
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
            this.message = 'Datos de reporte HNR obtenidos correctamente. Última actualización: ' + new Date().toLocaleString();

            // Mostrar toast de éxito
            this.toastService.show('Datos de reportes obtenidos', 'success');
        }, 2000);

        // En un caso real, usaríamos:
        /*
        this.http.get<{ message: string }>('http://localhost:8000/rdr').subscribe({
            next: res => {
                this.loading = false;
                this.message = res.message;
                this.toastService.show('Datos de reportes obtenidos', 'success');
            },
            error: err => {
                this.loading = false;
                this.message = '';
                const backendMsg = err?.error?.message || 'Error al obtener datos de informes.';
                this.toastService.show(backendMsg, 'error');
            }
        });
        */
    }
} 