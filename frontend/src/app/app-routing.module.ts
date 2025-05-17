import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HnsComponent } from './hns/hns.component';
import { HnrComponent } from './hnr/hnr.component';
import { HngComponent } from './hng/hng.component';
import { HnvComponent } from './hnv/hnv.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'hns',
        component: HnsComponent
    },
    {
        path: 'hnr',
        component: HnrComponent
    },
    {
        path: 'hng',
        component: HngComponent
    },
    {
        path: 'hnv',
        component: HnvComponent
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 