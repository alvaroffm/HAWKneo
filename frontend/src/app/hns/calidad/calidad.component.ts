import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hns-calidad',
    templateUrl: './calidad.component.html',
    styleUrls: ['./calidad.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class CalidadComponent {
    // Métricas de ejemplo para mostrar en el componente
    metricas = [
        { nombre: 'Completitud', valor: 95, unidad: '%' },
        { nombre: 'Precisión', valor: 87, unidad: '%' },
        { nombre: 'Consistencia', valor: 92, unidad: '%' },
        { nombre: 'Duplicados', valor: 3, unidad: '%' }
    ];
} 