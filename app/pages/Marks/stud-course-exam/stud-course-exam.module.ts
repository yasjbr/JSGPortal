import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudCourseExamIndexComponent } from './stud-course-exam-index/stud-course-exam-index.component';
import { RouterModule } from '@angular/router';
import { studCourseExamRoutes } from './stud-course-exam.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { StudCourseExamDialogComponent } from './stud-course-exam-dialog/stud-course-exam-dialog.component';
import { InlineEditComponent } from 'src/app/basic/inline.component';
import { NgxDatatableModule } from 'projects/swimlane/ngx-datatable/src/public-api';



@NgModule({
  declarations: [StudCourseExamIndexComponent, StudCourseExamDialogComponent],
  entryComponents:[StudCourseExamDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    // InlineEditComponent,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    RouterModule.forChild(studCourseExamRoutes)
  ]
})
export class StudCourseExamModule { }
