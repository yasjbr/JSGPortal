import { LookupsFormComponent } from './lookups-form/lookups-form.component';
import { NewsComponent } from './news/news.component';
import { LookupsIndexComponent } from './lookups-index/lookups-index.component';

import { Routes } from '@angular/router';
import { LookupTypeComponent } from './lookup-type/lookup-type.component';



export const lookupRoutes: Routes = [
    {
        path: '',
        children: [
           
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: LookupsIndexComponent },
            {path:'add',component:LookupsFormComponent,data: {breadcrumb:'Add'}},
            { path: 'lookuptype', component: LookupTypeComponent, data: { breadcrumb: 'Lookup Types' } },
            { path: 'edit/:id', component: LookupsFormComponent, data: { breadcrumb: 'Edit' } }
        ]
    }
];
