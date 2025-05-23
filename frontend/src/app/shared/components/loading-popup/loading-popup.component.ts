import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-popup',
  templateUrl: './loading-popup.component.html',
  styleUrls: ['./loading-popup.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LoadingPopupComponent {
  @Input() show: boolean = false;
  @Input() message: string = 'Cargando...';
} 