
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { regParentRoute } from './reg-parent.routing';
import { RegParentIndexComponent } from './reg-parent-index/reg-parent-index.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParentViewComponent } from './parent-view/parent-view.component';
import { RegParentService } from './reg-parent.service';




@NgModule({

    declarations: [
        RegParentIndexComponent,
        ParentFormComponent,
        ParentViewComponent

    ],

    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(regParentRoute),
        FormsModule,
        ReactiveFormsModule

    ],
    providers: [RegParentService]
})
export class RegParentModule { }