import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysRoleComponent } from './sys-role/sys-role.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { SysRoleDialogComponent } from './sys-roledialog/sys-role-dialog/sys-role-dialog.component';

@NgModule({
  declarations: [SysRoleComponent, AddRoleComponent, SuccessComponent, SysRoleDialogComponent],
  entryComponents:[AddRoleComponent],
  imports: [
    DeleteDialogComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RolesModule { }
