import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Suppliers } from 'src/app/Models/Stock/Suppliers';
import { ValidationBase } from 'src/app/validationBase';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplierdialog',
  templateUrl: './supplierdialog.component.html',
  styleUrls: ['./supplierdialog.component.scss']
})
export class SupplierdialogComponent implements OnInit {
  loading = false;
  edit = false;
  public form: FormGroup;
  returnUrl = "/Supplier/IndexSupplier";
  id: number=0;
  @Output() event = new EventEmitter<Suppliers>(true);
  
  
  constructor(
    private service: SupplierService,
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    public dialogRef: MatDialogRef<SupplierdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    // this.id=0;
    this.iniForm();
  }

  ngOnInit() {
    this.setupUpdate();
  }
  iniForm() {
    console.log("id=" + this.id);
    this.form = this.formbuilder.group({
      id: [this.id],
      supplierName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      contactPerson: [null],
      note: [null],
      // statusId:[null]
      // lkpLookupsStatus: [null],
    });
  }
  AddSupp() {

    this.service.AddSupplier(this.form.value).subscribe(
      res => {
        this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
        //  this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  public get errName(): AbstractControl {
    return this.form.get("supplierName");
  }
  submit() {
    //null;
  }
  submit2() {
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    this.loading = true;
     this.edit ? this.updateSupplier() : this.AddSupp();
    // /*this.edit?this.updateParent():*/ this.AddSupp();
  }
  closeDialog(): void {
    this.dialogRef.close();
    
  }
  
  setupUpdate() {
    if (!this.data.id) return;
   
    this.id = this.data.id; // +params.id;
    this.edit = true;
    this.loading = true;
    this.service.getsupplierbyId(this.id).subscribe(
      res => {
        console.log('setUp',res);
        this.form = this.validator.patchForm(this.form,res);
        console.log('formGtrup',this.form);
      },
      err => console.log(err),
      () => (this.loading = false)
    );
    //   });
  }
  updateSupplier() {
    //var id = this.data.id != null?this.data.id:"";
    this.service.SupplierUpdate(this.id, this.form.value).subscribe(
      res => {
        this.dialogRef.close(this.form.value);
        // this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
}
