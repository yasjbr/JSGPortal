import { StudentIndexComponent } from './student-index/student-index.component';

import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { studentRoute } from './student.routing';
import { StudentService } from './student.service';
import { StudentFormComponent } from './student-form/student-form.component';
import { ParentFormComponent } from '../parents/parent-form/parent-form.component';




@NgModule({

    declarations:[
     StudentIndexComponent,
     StudentFormComponent
     

    ],

    imports:[
CommonModule,
SharedModule,
RouterModule.forChild(studentRoute),
FormsModule,
ReactiveFormsModule

    ],
    providers:[StudentService]

})
export class StudentModule{}