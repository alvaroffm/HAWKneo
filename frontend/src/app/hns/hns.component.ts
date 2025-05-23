import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../core/services/toast.service';
import {
  ModuleLayoutComponent,
  Step,
} from '../shared/module-layout/module-layout.component';
import { IngestaComponent } from './ingesta/ingesta.component';
import { CalidadComponent } from './calidad/calidad.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';

@Component({
  selector: 'app-hns',
  templateUrl: './hns.component.html',
  styleUrls: ['./hns.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ModuleLayoutComponent,
    IngestaComponent,
    CalidadComponent,
    TratamientoComponent,
  ],
})
export class HnsComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  showLoadingPopup: boolean = false;
  loadingMessage: string = 'Procesando datos...';
  activeStep: number = 1;

  // Definición de los pasos para este módulo
  steps: Step[] = [
    { id: 1, name: 'Ingesta', icon: 'ingestor_icon.svg', active: true },
    { id: 2, name: 'Calidad', icon: 'quality_icon.svg' },
    { id: 3, name: 'Tratamiento', icon: 'treatment_icon.svg' },
  ];

  constructor(private http: HttpClient, private toastService: ToastService) {}

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
          this.message =
            'Conexión establecida correctamente. ' +
            new Date().toLocaleString();
          this.toastService.showSuccess('Conexión establecida');
          break;
        case 2:
          this.message = 'Verificación completada. Los datos son válidos.';
          this.toastService.showSuccess('Verificación completada');
          break;
        case 3:
          this.message = 'Ingesta finalizada. ' + new Date().toLocaleString();
          this.toastService.showSuccess('Datos ingestados correctamente');
          break;
      }
    }, 2000);
  }
}
