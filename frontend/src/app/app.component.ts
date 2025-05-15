import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class AppComponent {
  public title = 'HAWKneo';
  message = '';
  showSettingsMenu = false;

  constructor(private http: HttpClient) { }

  toggleSettingsMenu() {
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  getRDS() {
    this.http.get<{ message: string }>('http://localhost:8000/rds').subscribe(res => {
      this.message = res.message;
    });
  }

  getRDR() {
    this.http.get<{ message: string }>('http://localhost:8000/rdr').subscribe(res => {
      this.message = res.message;
    });
  }
}
