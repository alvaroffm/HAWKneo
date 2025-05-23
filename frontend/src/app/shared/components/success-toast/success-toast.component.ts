import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessToast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-success-toast',
  templateUrl: './success-toast.component.html',
  styleUrls: ['./success-toast.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SuccessToastComponent implements OnInit {
  @Input() toast?: SuccessToast;
  @Output() closed = new EventEmitter<string>();

  showToast = false;
  progress = 100;
  private intervalId?: number;

  ngOnInit(): void {
    // Trigger entrance animation
    setTimeout(() => {
      this.showToast = true;
    }, 10);

    if (this.toast?.autoHide) {
      // Start progress countdown
      this.startCountdown();
    }
  }

  closeToast(): void {
    this.showToast = false;
    // Wait for exit animation to complete
    setTimeout(() => {
      if (this.toast) {
        this.closed.emit(this.toast.id);
      }
    }, 300);

    this.clearCountdown();
  }

  private startCountdown(): void {
    if (!this.toast) return;

    const stepTime = 100; // Update every 100ms for smooth progress
    const steps = this.toast.duration / stepTime;
    const decrementPerStep = 100 / steps;

    this.intervalId = window.setInterval(() => {
      this.progress -= decrementPerStep;
      if (this.progress <= 0) {
        this.closeToast();
      }
    }, stepTime);
  }

  private clearCountdown(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
} 