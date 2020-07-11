import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyCourseExamIndexComponent } from './yearly-course-exam-index/yearly-course-exam-index.component';
import { RouterModule } from '@angular/router';
import { yearlyCourseExamRoutes } from './yearly-course-exam.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { YearlyCourseExamDialogComponent } from './yearly-course-exam-dialog/yearly-course-exam-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [YearlyCourseExamIndexComponent, YearlyCourseExamDialogComponent],
  entryComponents: 
  [YearlyCourseExamDialogComponent
  ], 
  imports: [
    CommonModule,
    SharedModule,
     FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(yearlyCourseExamRoutes)
  ]
})
export class YearlyCourseExamModule { }
