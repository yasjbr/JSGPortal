import { Routes } from '@angular/router';
import { PreviousdebtsComponent } from './previousdebts.component';


export const previousdebtsRoutes: Routes = [

    {
        path: '',
        children:
            [
                { path:'', redirectTo: 'index', pathMatch: 'full' },
                { path:'index', component:PreviousdebtsComponent},

            ]
    },
];
