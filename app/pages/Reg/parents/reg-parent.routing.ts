import { ParentViewComponent } from './parent-view/parent-view.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { Routes } from '@angular/router';
import { RegParentIndexComponent } from './reg-parent-index/reg-parent-index.component';


export const regParentRoute: Routes = [
    {

        path: '',
        children: [
            { path: '', redirectTo: 'index' },
            { path: 'index', component: RegParentIndexComponent },
            { path: 'add', component: ParentFormComponent },
            { path: 'edit/:id', component: ParentFormComponent },
            { path: 'view/:id', component: ParentViewComponent }
        ]
    }


]