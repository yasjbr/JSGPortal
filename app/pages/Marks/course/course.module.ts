import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseIndexComponent } from './course-index/course-index.component';
import { RouterModule } from '@angular/router';
import { courseRoutes } from './course.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';



@NgModule({
  declarations: [CourseIndexComponent, CourseDialogComponent],
  entryComponents:[CourseDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(courseRoutes),
    FormsModule,
  ]
})
export class CourseModule { }
