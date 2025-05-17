import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionsService, OptionItem } from '../services/options.service';
import { ToastService } from '../../toast.service';

@Component({
    selector: 'app-hns-ingesta',
    templateUrl: './ingesta.component.html',
    styleUrls: ['../shared/submodule-common.css', './ingesta.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class IngestaComponent implements OnInit {
    // Opciones para los desplegables
    fuentesDatos: OptionItem[] = [];
    clases: OptionItem[] = [];
    versiones: OptionItem[] = [];

    // Valores seleccionados
    fuenteSeleccionada: string = '';
    claseSeleccionada: string = '';
    versionSeleccionada: string = '';

    // Para mostrar mensajes
    mensaje: string = '';
    mostrarMensaje: boolean = false;

    // Estado de carga
    cargando = {
        fuentes: false,
        clases: false,
        versiones: false,
        resetDB: false
    };

    constructor(
        private optionsService: OptionsService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.cargarOpciones();
    }

    cargarOpciones(): void {
        // Cargar fuentes
        this.cargando.fuentes = true;
        this.optionsService.getFuentes().subscribe({
            next: (data) => {
                this.fuentesDatos = data;
                this.cargando.fuentes = false;
            },
            error: () => {
                this.cargando.fuentes = false;
                this.mostrarError('Error al cargar las fuentes de datos');
            }
        });

        // Cargar clases
        this.cargando.clases = true;
        this.optionsService.getClases().subscribe({
            next: (data) => {
                this.clases = data;
                this.cargando.clases = false;
            },
            error: () => {
                this.cargando.clases = false;
                this.mostrarError('Error al cargar las clases');
            }
        });

        // Cargar versiones
        this.cargando.versiones = true;
        this.optionsService.getVersiones().subscribe({
            next: (data) => {
                this.versiones = data;
                this.cargando.versiones = false;
            },
            error: () => {
                this.cargando.versiones = false;
                this.mostrarError('Error al cargar las versiones');
            }
        });
    }

    ejecutarIngesta(): void {
        if (!this.fuenteSeleccionada || !this.claseSeleccionada || !this.versionSeleccionada) {
            this.mostrarError('Por favor, seleccione todas las opciones antes de ejecutar');
            return;
        }

        // Aquí iría la lógica de ejecución real
        const fuenteLabel = this.obtenerEtiqueta(this.fuenteSeleccionada, this.fuentesDatos);
        const claseLabel = this.obtenerEtiqueta(this.claseSeleccionada, this.clases);
        const versionLabel = this.obtenerEtiqueta(this.versionSeleccionada, this.versiones);

        this.mensaje = `Iniciando ingesta desde ${fuenteLabel}, clase: ${claseLabel}, versión: ${versionLabel}`;
        this.mostrarMensaje = true;

        // Simulamos procesamiento
        setTimeout(() => {
            this.mensaje = 'Ingesta completada correctamente';
            setTimeout(() => this.mostrarMensaje = false, 3000);
        }, 2000);
    }

    /**
     * Reinicia la base de datos SQLite con datos de ejemplo
     */
    reiniciarBaseDatos(): void {
        this.cargando.resetDB = true;
        this.mensaje = 'Reiniciando base de datos...';
        // this.mostrarMensaje = true;

        this.optionsService.resetDatabase().subscribe({
            next: (response) => {
                if (response.success) {
                    // Usar toast en lugar del mensaje interno
                    this.toastService.show('Base de datos reiniciada correctamente', 'success');

                    // Recargar opciones
                    setTimeout(() => this.cargarOpciones(), 1000);
                } else {
                    this.toastService.show('Error al reiniciar la base de datos', 'error');
                    // this.mostrarMensaje = true;
                    setTimeout(() => this.mostrarMensaje = false, 3000);
                }
                this.cargando.resetDB = false;
            },
            error: () => {
                this.mensaje = 'Error al reiniciar la base de datos';
                // this.mostrarMensaje = true;
                this.cargando.resetDB = false;
                setTimeout(() => this.mostrarMensaje = false, 3000);
            }
        });
    }

    private mostrarError(mensaje: string): void {
        this.mensaje = mensaje;
        this.mostrarMensaje = true;
        setTimeout(() => this.mostrarMensaje = false, 3000);
    }

    private obtenerEtiqueta(valor: string, opciones: OptionItem[]): string {
        const opcion = opciones.find(opt => opt.value === valor);
        return opcion ? opcion.label : valor;
    }
} 