import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayCorsesTeacherComponent } from './display-corses-teacher/display-corses-teacher.component';
import { DialogCorsesTeachersComponent } from './dialog-corses-teachers/dialog-corses-teachers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CorsesTeacherRouting } from './corsesteacher.routing';

@NgModule({
  declarations: [DialogCorsesTeachersComponent, DisplayCorsesTeacherComponent],
  entryComponents:[
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CorsesTeacherRouting),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorsesTeachersModule { }
