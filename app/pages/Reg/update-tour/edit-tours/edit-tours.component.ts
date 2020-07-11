import { Component, OnInit, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Admission } from 'src/app/Models/Admission/admission';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect } from '@angular/material';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { TourService } from 'src/app/pages/addLookups/tours/tour.service';
import { lkpTour } from 'src/app/Models/addLookups/tours/lkpTour';
import { ToursComponent } from '../tours/tours.component';
import { ValidationBase } from 'src/app/validationBase';
@Component({
  selector: 'app-edit-tours',
  templateUrl: './edit-tours.component.html',
  styleUrls: ['./edit-tours.component.scss']
})
export class EditToursComponent implements OnInit {
  public form: FormGroup;
  returnUrl = "UpdateTour/Tours";
  selected: any;
  studTourList: lkpTour[];
  tourTypeList: lkpTour[];
  tourValue: any;
  tourTypeValue: any;
  tourPrice: number = 0;
  id: number;
  dataobj: any;
  edit = false;
  loading = false;
  tourindex: any;
  tourTypeindex: any;
  @ViewChild('tourTypeIndex') tourTypeIndex: MatSelect;
  @ViewChild('tourIndex') tourIndex: MatSelect;
  @Output() event = new EventEmitter<Admission>(true);

  constructor(
    public validator: ValidationBase,
    private formbuilder: FormBuilder,
    private service: AdmService,
    public router: Router,
    private tourService: TourService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ToursComponent>,
  ) { }

  ngOnInit() {
    this.iniForm();
    this.getTourList();
    this.getTypeTourList();
    this.setupUpdate();
  }
  iniForm() {
    this.form = this.formbuilder.group({
      //  studId:[this.selected],
      tourId: [null, [Validators.required]],
      tourTypeId: [null, [Validators.required]],
      tourPrice: []
    });
  }

  getTourList() {
    return this.tourService.tourList().subscribe(res => {
      this.studTourList = res;
      console.log('TourList', this.studTourList);

      // try { this.formGroup.get("tourId").setValue(res[0].id) } catch (error) { };
    });

  }
  getTypeTourList() {
    return this.tourService.tourType().subscribe(res => {
      this.tourTypeList = res;
      console.log('tourTypeList', this.tourTypeList);
    })
  }
  closeDialog(): void {
    this.dialogRef.close();

  }

  setupUpdate() {
    console.log('data-id in set', this.data, this.data.studentId);
    if (!this.data.studentId) return;
    this.id = this.data.studentId; // +params.id;



    this.edit = true;
    this.loading = true;
    this.service.GetStudTourdetail(this.id).subscribe(
      res => {
        console.log('setUp', res.result.result);
        this.dataobj = res.result.result;
        console.log('datta',this.dataobj);
        
        // this.selected = res.result.result.id;

        // console.log('sselected',this.selected);


        this.form = this.validator.patchForm(this.form, res.result.result);
        console.log('formGrup', this.form);
      },
      err => console.log(err),
      () => (this.loading = false)
    );
  }
  onTourChange() {
    let n = -1;

    if (this.tourIndex.value == null) {
      this.tourindex = this.dataobj.tourId;
    }
    else {
      this.tourindex = this.tourIndex.value - 1;
      console.log('tourIndex', this.tourIndex.value);
    }



    if (this.tourTypeIndex.value == null) {
      this.tourTypeindex = this.dataobj.tourTypeId;
      console.log('tourTypeindex',this.tourTypeindex);
    }
    else{
      this.tourTypeindex = this.tourTypeIndex.value;
      console.log('tourTypeIndex', this.tourTypeIndex.value);
    }


    // let tourFullPrice = this.studTourList[this.tourindex].tourFullPrice;
    // console.log('tourFullPriceforiii', tourFullPrice);


    // let tourHalfPrice = this.studTourList[this.tourindex].tourHalfPrice;
    // console.log('tourHalfPricefor iii', tourHalfPrice);

    if (this.tourTypeindex == 1127 ||this.tourindex == 0) {
      console.log('tourPPrice', this.tourPrice);
      this.form.get("tourPrice").setValue(0);
    }
    else if (this.tourTypeindex == 1125 || this.tourTypeindex == 1124) {
     let tourHalfPrice = this.studTourList[this.tourindex].tourHalfPrice;
      this.form.get("tourPrice").setValue(tourHalfPrice);
    } else {
      let tourFullPrice = this.studTourList[this.tourindex].tourFullPrice;

      this.form.get("tourPrice").setValue(tourFullPrice);
    }


    // this.totalPrice = this.tourPrice + this.classPrice;

  }
  submit() {

    console.log('iddddd', this.form.value, 'stud id', this.data.studentId);


    this.service.setNewTour(this.data.studentId, this.form.value).subscribe(res => {
      // this.router.navigateByUrl(this.returnUrl);
      this.dialogRef.close(this.form.value);

      // this.router.navigateByUrl(this.returnUrl);
    }, err =>
      console.log(err)
    );
    this.closeDialog();
  }
}



