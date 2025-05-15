import { Routes } from '@angular/router';
import { HnsSubmoduleComponent } from './hns-submodule.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'hns', component: HnsSubmoduleComponent }
];
