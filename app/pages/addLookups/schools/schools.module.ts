import { AppComponent } from './../../../app.component';
import { schoolRoutes } from './school.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolIndexComponent } from './school-index/school-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SchoolService } from './school.service';
import { SchoolFormComponent } from './school-form/school-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(schoolRoutes),
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [SchoolIndexComponent, SchoolFormComponent],
  providers: [SchoolService]

})
export class SchoolsModule { }
