import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hns-tratamiento',
    templateUrl: './tratamiento.component.html',
    styleUrls: ['../shared/submodule-common.css', './tratamiento.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class TratamientoComponent {
    // Datos de ejemplo para la transformación
    transformaciones = [
        { nombre: 'Normalización', estado: 'completado', descripcion: 'Normalización de campos numéricos' },
        { nombre: 'Enriquecimiento', estado: 'pendiente', descripcion: 'Enriquecimiento con datos externos' },
        { nombre: 'Concatenación', estado: 'completado', descripcion: 'Unión de fuentes de datos' },
        { nombre: 'Transformación', estado: 'en-progreso', descripcion: 'Transformación de formatos' }
    ];
} 