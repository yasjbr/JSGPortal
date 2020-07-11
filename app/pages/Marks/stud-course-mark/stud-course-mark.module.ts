import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudCourseMarkIndexComponent } from './stud-course-mark-index/stud-course-mark-index.component';
import { RouterModule } from '@angular/router';
import { studCourseMarkRoutes } from './stud-course-mark.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 



@NgModule({
  declarations: [StudCourseMarkIndexComponent],
  imports: [
    CommonModule,
    SharedModule, 
    CommonModule,
    SharedModule,
     FormsModule,
    ReactiveFormsModule,
    // InlineEditComponent,
    RouterModule.forChild(studCourseMarkRoutes)
  ]
})
export class StudCourseMarkModule { }
