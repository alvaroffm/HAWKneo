/* Este archivo ya no se usa, volvemos a usar app-routing.module.ts */
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'hns',
        loadComponent: () => import('./hns/hns.component').then(m => m.HnsComponent)
    },
    {
        path: 'hnr',
        loadComponent: () => import('./hnr/hnr.component').then(m => m.HnrComponent)
    },
    {
        path: 'hng',
        loadComponent: () => import('./hng/hng.component').then(m => m.HngComponent)
    },
    {
        path: 'hnv',
        loadComponent: () => import('./hnv/hnv.component').then(m => m.HnvComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
