import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { StudMarkService } from '../stud-mark.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stud-mark-dialog',
  templateUrl: './stud-mark-dialog.component.html',
  styleUrls: ['./stud-mark-dialog.component.scss']
})

export class StudMarkDialogComponent implements OnInit {

  form: FormGroup;
  id: number;
  constructor(public validator: ValidationBase, private service: StudMarkService
    , public dialogRef: MatDialogRef<StudMarkDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



  submit() {
    console.log('----------------submit begin');

    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    console.log('------------submit 2');

    this.updateStudMark();
  }


  updateStudMark() {
    console.log('update');
    console.log(this.id + '  ' + this.form.get('yearId').value);
    
    this.service.updateStudMark(this.id, this.form.value).subscribe(
      res => {
        this.dialogRef.close(this.form.value);
      },
      err => {console.log(err) 
      console.log('ffffffffffffff');
      }
    );
  }

  ngOnInit() {
    this.initForm();
    this.setupUpdate();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.form = this.fb.group({
      id: [0],
      yearId: [],
      termId:[],
      studentId: [],
      mark: [],
      formTeacherNote: '',
      principalNote: '',
      cleanliness: '',
      rulesRespect: '',
      attendanceDays: [0]
    })
  }



  setupUpdate() {
    if (!this.data.id) return;
    this.id = this.data.id;
    this.service.GetStudMarksById(this.id).subscribe(res => {
      this.form = this.validator.patchForm(this.form, res[0]);
      console.log(res[0]);

    }, err => console.log(err),
    );
  }

}
