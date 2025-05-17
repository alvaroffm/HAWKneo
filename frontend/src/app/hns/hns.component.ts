import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { ModuleLayoutComponent, Step } from '../shared/module-layout/module-layout.component';
import { IngestaComponent } from './ingesta/ingesta.component';
import { CalidadComponent } from './calidad/calidad.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';

@Component({
    selector: 'app-hns',
    templateUrl: './hns.component.html',
    styleUrls: ['./hns.component.css'],
    standalone: true,
    imports: [CommonModule, ModuleLayoutComponent, IngestaComponent, CalidadComponent, TratamientoComponent]
})
export class HnsComponent implements OnInit {
    loading: boolean = false;
    message: string = '';
    showLoadingPopup: boolean = false;
    loadingMessage: string = 'Procesando datos...';
    activeStep: number = 1;

    // Definición de los pasos para este módulo
    steps: Step[] = [
        { id: 1, name: 'Ingesta', icon: 'ic_fluent_document_catch_up_20_regular.svg', active: true },
        { id: 2, name: 'Calidad', icon: 'ic_fluent_checkmark_circle_20_regular.svg' },
        { id: 3, name: 'Tratamiento', icon: 'ic_fluent_data_funnel_20_regular.svg' }
    ];

    constructor(private http: HttpClient, private toastService: ToastService) { }

    ngOnInit(): void {
        // Inicializar en el primer paso
    }

    getData(): void {
        this.loading = true;

        // Simular una petición HTTP según el paso actual
        setTimeout(() => {
            this.loading = false;

            switch (this.activeStep) {
                case 1:
                    this.message = 'Conexión establecida correctamente. ' + new Date().toLocaleString();
                    this.toastService.show('Conexión establecida', 'success');
                    break;
                case 2:
                    this.message = 'Verificación completada. Los datos son válidos.';
                    this.toastService.show('Verificación completada', 'success');
                    break;
                case 3:
                    this.message = 'Ingesta finalizada. ' + new Date().toLocaleString();
                    this.toastService.show('Datos ingestados correctamente', 'success');
                    break;
            }

        }, 2000);
    }
} 