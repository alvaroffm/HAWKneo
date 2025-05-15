import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent // Standalone component solo aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }