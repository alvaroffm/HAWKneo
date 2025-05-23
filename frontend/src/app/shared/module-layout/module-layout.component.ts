import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from '../components/toast-container/toast-container.component';
import { LoadingPopupComponent } from '../components/loading-popup/loading-popup.component';

export interface Step {
  id: number;
  name: string;
  icon?: string;
  active?: boolean;
}

@Component({
  selector: 'app-module-layout',
  templateUrl: './module-layout.component.html',
  styleUrls: ['./module-layout.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ToastContainerComponent,
    LoadingPopupComponent,
  ],
})
export class ModuleLayoutComponent {
  @Input() title: string = '';
  @Input() moduleIcon: string = '';
  @Input() showLoadingPopup: boolean = false;
  @Input() loadingMessage: string = 'Cargando...';
  @Input() steps: Step[] = [];

  // Track active step
  @Input() activeStep: number = 1;
  @Output() activeStepChange = new EventEmitter<number>();

  setActiveStep(stepId: number): void {
    this.activeStep = stepId;
    this.activeStepChange.emit(stepId);
  }

  // Método para obtener el icono correspondiente a cada paso
  getIconForStep(stepId: number): string {
    // Si el paso tiene un icono definido, usarlo
    const step = this.steps.find((s) => s.id === stepId);
    if (step && step.icon) {
      return step.icon;
    }

    // Si no tiene icono definido, asignar uno por defecto según el ID
    switch (stepId % 5) {
      case 1:
        return 'ic_fluent_document_catch_up_20_regular.svg';
      case 2:
        return 'ic_fluent_data_histogram_20_regular.svg';
      case 3:
        return 'ic_fluent_checkmark_circle_20_regular.svg';
      case 4:
        return 'ic_fluent_database_20_regular.svg';
      case 0:
      default:
        return 'ic_fluent_data_funnel_20_regular.svg';
    }
  }
}
