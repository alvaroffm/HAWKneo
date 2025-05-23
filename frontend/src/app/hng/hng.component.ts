import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ModuleLayoutComponent,
  Step,
} from '../shared/module-layout/module-layout.component';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-hng',
  templateUrl: './hng.component.html',
  styleUrls: ['./hng.component.css'],
  standalone: true,
  imports: [CommonModule, ModuleLayoutComponent],
})
export class HngComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  showLoadingPopup: boolean = false;
  loadingMessage: string = 'Procesando datos relacionales...';

  // Definición de los pasos para este módulo
  steps: Step[] = [
    {
      id: 1,
      name: 'Consulta',
      icon: 'ic_fluent_data_histogram_20_regular.svg',
      active: true,
    },
    { id: 2, name: 'Gestión', icon: 'ic_fluent_database_20_regular.svg' },
  ];

  constructor(private http: HttpClient, private toastService: ToastService) {}

  ngOnInit(): void {
    // No automatic data fetch on initialization
    this.message = 'Pulse el botón para obtener datos relacionales';
  }

  getData(): void {
    this.loading = true;
    this.toastService.showInfo('Solicitando datos relacionales...');

    this.http
      .get<{ ok: boolean; message: string }>('http://localhost:8000/rds')
      .subscribe({
        next: (res) => {
          this.loading = false;
          if (res.ok) {
            this.message =
              res.message +
              ' - Última actualización: ' +
              new Date().toLocaleString();
            this.toastService.showSuccess(
              'Datos relacionales cargados correctamente'
            );
          } else {
            this.message = 'Error al cargar datos relacionales';
            this.toastService.showError(res.message);
          }
        },
        error: (err) => {
          this.loading = false;
          this.message = 'Error al obtener datos relacionales';
          const backendMsg =
            err?.error?.message || 'Error al conectar con el servidor.';
          this.toastService.showError(backendMsg);
        },
      });
  }
}
