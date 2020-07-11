import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ValidationBase } from 'src/app/validationBase';
import { Admission } from 'src/app/Models/Admission/admission';
import { ChaStuDivisionComponent } from '../chaStudivision/cha-division.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-division',
  templateUrl: './update-division.component.html',
  styleUrls: ['./update-division.component.scss']
})
export class UpdateDivisionComponent implements OnInit {
  public form: FormGroup;
  returnUrl = "Change-division/index";
  id: number = 0;
  classId:number;
  edit = false;
  loading = false;
  ClassSeqList: any;
  selected: any;
  @Output() event = new EventEmitter<Admission>(true);
  constructor(
    public validator: ValidationBase,
    public dialogRef: MatDialogRef<ChaStuDivisionComponent>,
    // private classService: ClassService,
    private formbuilder: FormBuilder,
    private service: AdmService,
    public router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.iniForm();
    this.getClassSeqList();
    this.setupUpdate();
  }
  iniForm() {

    this.form = this.formbuilder.group({
      classSeqId: [this.selected],
      classSeqName: [null, [Validators.required]],
    });
  }

  getClassSeqList() {
    this.service.GetStudSClassSeq().subscribe(res => {
      this.ClassSeqList = res;
      console.log('ClassSeqbysection', this.ClassSeqList);
    });
  }


  setupUpdate() {
    console.log('data-id in set', this.data);
    if (!this.data.classSeqId) return;
    this.id = this.data.classSeqId; // +params.id;
   
    
    
    this.edit = true;
    this.loading = true;
    this.service.GetStudClassSeqbyId(this.id).subscribe(
      res => {
        console.log('setUp', res);
        this.selected = res[0].classSeqId;
        this.classId=res[0].classId;
        console.log(this.classId);
        console.log(this.selected);
        this.form = this.validator.patchForm(this.form, res[0]);
        console.log('formGrup', this.form);
      },
      err => console.log(err),
      () => (this.loading = false)
    );
  }
  closeDialog(): void {
    this.dialogRef.close();

  }
  newID: any;
  updateClassSeq(newID) {
    this.newID = newID;
    console.log('newID', this.newID);

  }
  submit2() {
    console.log('fffdd',this.id, this.classId,this.newID);
    if (this.newID) {

      this.service.setNewClassSeq(this.id, this.classId,this.newID).subscribe(res => {
        // this.dialogRef.close(this.form.value);
        this.router.navigateByUrl(this.returnUrl);
      },err=>
        console.log(err)
      );
     
    }
    this.closeDialog();
  }
}
