import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 import { StudMarkIndexComponent } from './stud-mark-index/stud-mark-index.component';
import { RouterModule } from '@angular/router';
import { studMarkRoutes } from './stud-mark.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudMarkService } from './stud-mark.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StudCertificateComponent } from './Stud-certificate/stud-certificate.component';
import { StudMarkDialogComponent } from './stud-mark-dialog/stud-mark-dialog.component';


@NgModule({
  declarations: [  StudMarkIndexComponent, StudCertificateComponent, StudMarkDialogComponent],
  entryComponents: [StudMarkDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule, 
    RouterModule.forChild(studMarkRoutes) 
  ],
  providers:[StudMarkService]
})
export class StudMarkModule { }
