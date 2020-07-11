import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyCourseIndexComponent } from './yearly-course-index/yearly-course-index.component';
import { RouterModule } from '@angular/router';
import { yearlyCourseExamRoutes } from '../yearly-course-exam/yearly-course-exam.routing';
import { yearlyCourseRoutes } from './yearly-course.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YearlyCourseDialogComponent } from './yearly-course-dialog/yearly-course-dialog.component';
import { MatCheckboxModule } from '@angular/material';
 


@NgModule({
  declarations: [YearlyCourseIndexComponent, YearlyCourseDialogComponent],
  entryComponents:[YearlyCourseDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule ,
    RouterModule.forChild(yearlyCourseRoutes)
  ]
})
export class YearlyCourseModule { }
