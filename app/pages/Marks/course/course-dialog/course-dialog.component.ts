import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationBase } from 'src/app/validationBase';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {
  public form: FormGroup;
  edit = false;
  id: number;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    public validator: ValidationBase,
    private service: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.setupUpdate();
    this.initForm();
  }


  closeDialog(): void {
    console.log('---------------8888---close');
    this.dialogRef.close();
  }



  submit() {

    console.log('---------------sub');
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    this.edit ? this.updateCourse() : this.addCourse();
    this.dialogRef.close(this.form.value);
  }


  //Course Operations
  addCourse() {
    this.service.addCourse(this.form.value).subscribe();
  }


  setupUpdate() {

    console.log(this.data.id + '------------this.data.id');
    if (!this.data.id) return;
    this.id = this.data.id;
    console.log(this.data.id + '------------this.data');

    this.edit = true;
    
    this.service.getCourse(this.id).subscribe(res => {
      this.form = this.validator.patchForm(this.form, res);
      console.log(res + 'res----------');

    },
      err => console.log(err));

  }


  updateCourse() {
    this.service.updateCourse(this.id, this.form.value).subscribe(res => {
      this.dialogRef.close(this.form.value);
    },
      err => console.log(err)
    )
  }


  initForm() {
    this.form = this.fb.group({
      id: [0],
      arDescription: ['', Validators.required]
    })
  }

}
