import { SectionService } from './section.service';
import { SectionIndexComponent } from './section-index/section-index.component';
import { sectionRoutes } from './section.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionFormComponent } from './section-form/section-form.component';

@NgModule({
  declarations: [
    SectionIndexComponent,
    SectionFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(sectionRoutes),
    FormsModule,
    ReactiveFormsModule

  ],
  providers:[SectionService]
})
export class SectionModule { }
