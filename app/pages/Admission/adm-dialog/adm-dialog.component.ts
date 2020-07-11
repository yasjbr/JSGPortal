import { DateFormat } from './../../financial/payment/date-format';
import { log, format } from "util";
import { AdmFormComponent } from "./../adm-form/adm-form.component";
import { Admission } from "./../../../Models/Admission/admission";
import { BusService } from "./../../addLookups/Buses/bus.service";

import { AdmService } from "./../adm.service";
import { Component, OnInit, Output, EventEmitter, Inject, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ValidationBase } from "src/app/validationBase";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Lkplookup } from "src/app/Models/Lookups/lkplookup";
import { LkpSection } from "src/app/Models/addLookups/sections/lkpSection";
import { LookupTypes } from "src/app/Models/Enum/SystemEnum";
import { LookupsApiService } from "../../lookups/lookups-api.service";
import { ClassService } from "../../addLookups/classes/class.service";
import { TourService } from "../../addLookups/tours/tour.service";
import { lkpTour } from "src/app/Models/addLookups/tours/lkpTour";
import { LkpBus } from "src/app/Models/addLookups/bus/lkpBus";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDatepickerInputEvent,
  MatSelect
} from "@angular/material";
import { SectionService } from "../../addLookups/sections/section.service";
import { DatePipe, formatDate } from "@angular/common";
import { users } from 'src/app/Models/Users/users';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { RegStudService } from '../../Reg/registration/reg-stud.service';



@Component({
  selector: "app-adm-dialog",
  templateUrl: "./adm-dialog.component.html",
  styleUrls: ["./adm-dialog.component.scss"],

})
export class AdmDialogComponent implements OnInit {
  public birthDate: string;
  @Output() event = new EventEmitter<Admission>(true);
  loading = false;
  public formGroup: FormGroup;
  returnUrl = "/admissions/index";
  edit = false;
  id: number = 0;
  parentId: any;
  fatherName: any;
  tourValue: any;
  tourTypeValue: any;
  tourPrice: number = 0;
  classValue: any;
  sectionValue: any;
  classPrice: number = 0;
  totalPrice: any = 0;
  studAge: any = 0;

  martialList: Lkplookup[];
  citiesList: Lkplookup[];
  religionsList: Lkplookup[];
  nationalList: Lkplookup[];
  countriesList: Lkplookup[];
  idTypesList: Lkplookup[];
  healthStatusList: Lkplookup[];
  genderList: Lkplookup[];
  educationList: Lkplookup[];
  relationList: Lkplookup[];
  YearsList: Lkplookup[];
  TermsList: Lkplookup[];
  sectionList: LkpSection[];
  classSeqList: Lkplookup[];
  classList: lkpClass[];
  tourList: lkpTour[];
  busList: LkpBus[];
  tourTypeList: Lkplookup[];
  schoolId: any;
  classFee: any;
  amtPrice: number;
  classId: number;
  existFullName:boolean =false;
  StudentNameList: Admission[];
  fullName : string ="";
  constructor(
    private RegStudService: RegStudService,
    private router: Router,
    public validator: ValidationBase,
    private fb: FormBuilder,
    private service: AdmService,
    private route: ActivatedRoute,
    private lookup: LookupsApiService,
    private classService: ClassService,
    private tourService: TourService,
    private busService: BusService,
    private currentUserService: CurrentUserService,
    private sectionService: SectionService,
    public dialogRef: MatDialogRef<AdmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    // let schoolData = JSON.parse(localStorage.getItem("token")) as users;

    // this.schoolId = schoolData.schoolId;

    // console.log("data");
    // console.log(data);
    this.classPrice = this.amtPrice;
    this.totalPrice = 0;
    // console.log("totalPrice=" + this.totalPrice);
    this.id = 0;
    this.parentId = this.service.sParentId;
    this.fatherName = this.service.sParentName;
    this.iniForm();
  }

  message: string;
  pp: string;
  ngOnInit() {
    this.getLookups();
    this.getClassList();
    this.getTourList();
    this.getBusList();
    this.getSectionList();

    this.service.currentMessage.subscribe(message => {
      console.log('Message', this.message);
      this.message = message
    });

    this.setupUpdate();

    //   this.service.currentParentIdParam.subscribe(p => this.parentId = p);

    //this.parentId=this.service.sParentId;
    //console.log(this.parentId);
  }

  getClassList() {
    console.log('-----------------'+this.schoolId);

    return this.classService
      .GetClassBySchool(this.schoolId)
      .subscribe(res => {
        this.classList = res;
        console.log('classLLLLLLLList', res)
      });
  }
  
  getTourList() {
    return this.tourService.tourList().subscribe(res => {
      this.tourList = res;
      try { this.formGroup.get("tourId").setValue(res[0].id) } catch (error) { };
    });

  }
  getBusList() {
    return this.busService.busList().subscribe(res => (this.busList = res));
  }
  getSectionList() {
    return this.sectionService
      .sectionBySchoolList(this.schoolId)
      .subscribe(res => (this.sectionList = res));
  }

  newMessage() {
    let x = this.service.changeMessage("Hello from Sibling");
    // console.log(this.message);
  }

  iniForm() {
    console.log("id=" + this.id);
    this.formGroup = this.fb.group({
      id: [this.id],
      firstName: [null, [Validators.required]],
      parentId: [this.parentId],
      studNo: [null],
      schoolId: [this.schoolId, [Validators.required]],
      sectionId: [null, [Validators.required]],
      // nationalityId: [null, [Validators.required]],
      fatherName: [this.fatherName],
      entryDate: [null],
      // religionId: [null, [Validators.required]],
      birthDate: ['', [Validators.required]],
      genderId: [null, [Validators.required]],
      yearId: [this.service.sCurrentYearId],
      classId: [0],
      classSeqId: [null],
      tourId: [null], 
      tourTypeId: [null],
      //busId: [null],
      tourPrice: [0],
      studentBrotherSeq: [1],
      brotherDescountType: [null],
      busNote: [null],
      note: [null],
      classPrice: [0],
      totalPrice: [0],
      studAge: [0],
      joinYearId: [this.service.sCurrentYearId],

    });
  }

  addStud() {
    this.service.admInsert(this.formGroup.value).subscribe(
      res => {
        // console.log("add");
        this.event.emit(this.formGroup.value);
        this.dialogRef.close(this.formGroup.value);
        // this.router.navigateByUrl(this.returnUrl);
        // console.log(res);
      },
      err => console.log(err)
    );
  }

  submit() {
    //null;
  }

  submit2() {
    if (!this.formGroup.valid) {
      // console.log("form not valid");

      this.validator.markFormTouched(this.formGroup);
      return;
    }

    this.loading = true;
    this.edit ? this.updateStud() : this.addStud();
  }


  
  getStudentNameList() {

    
    let f = this.formGroup.get('firstName').value;
   
   this.fullName = f+' '+this.service.sParentName

   console.log(this.fullName+'this.fullname --------------------');
    return this.service.GetStudentByStudentName(this.fullName).subscribe(res => {
      this.StudentNameList = res

      if (this.StudentNameList.length > 0){
        console.log('fiiiiiiiiiiiiiiiih' + this.StudentNameList.length );
        this.existFullName = true;
         return;
      }

      else {
        this.submit2();
      }
    });
    
  }




  public get name(): AbstractControl {
    return this.formGroup.get("firstName");
  }

  /// Fill Lookups

  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      //console.log("Loop");
      switch (element[0].typeId) {
        case LookupTypes.MartialStatus:
          this.martialList = element;
          break;
        case LookupTypes.Cities:
          this.citiesList = element;
          break;
        case LookupTypes.Religions:
          this.religionsList = element;
          break;
        case LookupTypes.Countries:
          this.countriesList = element;
          break;
        case LookupTypes.IdTypes:
          this.idTypesList = element;
          break;
        case LookupTypes.HealthStatus:
          this.healthStatusList = element;
          break;
        case LookupTypes.Gender:
          this.genderList = element;
          break;
        case LookupTypes.Nationalities:
          this.nationalList = element;
          defVal = element.findIndex(i => i.defaultValue === 1);
          try {
            value = element[defVal].id;
            this.formGroup.get("nationalityId").setValue(value);
          } catch (error) { };

          break;
        case LookupTypes.EducationLevel:
          this.educationList = element;
          break;
        case LookupTypes.Relationships:
          this.relationList = element;
          break;
        case LookupTypes.Years:
          this.YearsList = element;
          break;
        case LookupTypes.Terms:
          this.TermsList = element;
          break;
        case LookupTypes.ClassSeq:
          this.classSeqList = element;
          defVal = element.findIndex(i => i.defaultValue === 1);
          try { value = element[defVal].id; } catch (error) { }
          this.formGroup.get("classSeqId").setValue(value);
          break;
        case LookupTypes.TourType:
          this.tourTypeList = element;
          defVal = element.findIndex(i => i.defaultValue === 1);
          try {
            value = element[defVal].id;
            this.formGroup.get("tourTypeId").setValue(value);
          } catch (error) { }


        default:
          break;
      }
    });
  }
  // this.tourTypeList.findIndex(
  //       i => i.id === this.tourTypeValue
  private getLookups() {
    this.lookup
      .getLookupsByType2([
        LookupTypes.MartialStatus,
        LookupTypes.Countries,
        LookupTypes.IdTypes,
        LookupTypes.Cities,
        LookupTypes.Religions,
        LookupTypes.HealthStatus,
        LookupTypes.Gender,
        LookupTypes.Nationalities,
        LookupTypes.EducationLevel,
        LookupTypes.Relationships,
        LookupTypes.Years,
        LookupTypes.Terms,
        LookupTypes.ClassSeq,
        LookupTypes.TourType
      ])
      .subscribe(
        res => this.fillLookups(res),
        _err => {
          console.log("Error");
        },
        () => {
          console.log("Complite");
          // this.setupValidation();
          //   this.setUpUpdate();
        }
      );
  }

  /// Tour Calculations
  onTourChange() {
    let n = -1;

    let tourIndex = this.tourList.findIndex(i => i.id === this.tourValue);
    let tourTypeIndex = this.tourTypeList.findIndex(i => i.id === this.tourTypeValue);
    let tourFullPrice = this.tourList[tourIndex].tourFullPrice;
    let tourHalfPrice = this.tourList[tourIndex].tourHalfPrice;
    if (tourTypeIndex >= 0 && tourIndex >= 0 ) {
      if (tourTypeIndex === 2) this.tourPrice = tourFullPrice;
      else if(tourTypeIndex ===3 )this.tourPrice=0;
      else this.tourPrice = tourHalfPrice;
    }
    console.log('tourPPrice', this.tourPrice);
    console.log('classPPrice when tour change', this.classPrice);

    this.totalPrice = this.tourPrice + this.classPrice;

  }

  resetTourType() {
    let value;
    let defVal = this.tourTypeList.findIndex(i => i.defaultValue === 2);
    try {
      value = this.tourTypeList[defVal].id;
      this.formGroup.get("tourTypeId").setValue(value);
    } catch (error) { }

  }

  /// Class Calculations


  onClassChange() {

    // try {
    //   let Index = this.classList.findIndex(i => i.id === this.classValue);
    //   // let amtPrice = this.classList[Index].classFees != null ?
    //   //   Number(this.classList[Index].classFees) : 0;
    //   //   Number(this.classList[Index].classFees) : 0;
    //   console.log('tourPrice',this.tourPrice);
    //   console.log('classPPPPPrice',this.amtPrice);

    //   this.sectionValue = this.classList[Index].sectionId;
    //   // this.classPrice = this.amtPrice;
    //   this.totalPrice = this.tourPrice + this.amtPrice;
    // } catch (error) {
    //   this.classPrice = 0;
    //   this.totalPrice = this.tourPrice + this.classPrice;
    // }
    console.log('classIIIIIIId', this.classValue);

    return this.RegStudService.getClassFee(this.classValue).subscribe(res => {
      this.classFee = res;
      this.amtPrice = this.classFee.result.result.classFee;
      console.log('amtPrice', this.amtPrice);
      this.formGroup.get('classPrice').setValue(this.amtPrice);
    });
    //console.log("Index="+Index+"  amtPrice="+amtPrice+"  classValue="+this.classValue);
  }
  // console.log("index="+tourTypeIndex+"   value="+this.tourTypeValue+
  // "  tourIndex="+tourIndex+"  tourValue="+this.tourValue);
  //  console.log("index= "+tourIndex+"  F="+tourFullPrice+" H="+tourHalfPrice+
  //  "  tourTypeIndex="+tourTypeIndex+" tourPrice="+this.tourPrice);

  //Dialog

  closeDialog(): void {
    this.dialogRef.close();
  }

  //Update

  setupUpdate() {
    // this.route.params.subscribe(params => {
    //   if (!params.id) {
    //     return;
    //   }
    if (!this.data.id) return;

    this.id = this.data.id; // +params.id;
    this.classPrice = this.data != null ? this.data.classPrice : 0;
    this.totalPrice = this.data != null ? this.data.totalPrice : 0;
    this.edit = true;
    this.loading = true;
    this.service.getStud(this.id).subscribe(
      res => {
        console.log('setUp', res);
        this.formGroup = this.validator.patchForm(this.formGroup, res);
      },
      
      err => console.log(err),
      () => (this.loading = false)
    );

    //   });
  }

  updateStud() {
    //var id = this.data.id != null?this.data.id:"";
    this.service.admUpdate(this.id, this.formGroup.value).subscribe(
      res => {
        this.dialogRef.close(this.formGroup.value);
        // this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  //Calc Student Age and choose the Student Class

  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>>;

  calcStudAge() {
    let classAge: number;
    var timeDiff;
    let b: Date = this.formGroup.get("birthDate").value;
    let val = formatDate(b, "yyyy/MM/dd", "en");
    console.log("val=" + val + "   b=" + b.getTime(), 'DateNow', Date.now());

    if (b) {
      if (Date.now() >= b.getTime())
        timeDiff = Math.abs(Date.now() - b.getTime());
      else timeDiff = 0;
      console.log("timeDiff=" + timeDiff);
      this.studAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log("age=" + this.studAge);
    }

    var index;
    let gender = Number(this.formGroup.get("genderId").value);

    if (gender == 44) { gender = 1 };
    if (gender == 45) { gender = 2 };
     
    index = this.classList ? this.classList.findIndex(i => i.age === this.studAge && i.classGender === gender) : -1;
    console.log("this.studAge=" + this.studAge + "   gender=" + gender);
    if (index == -1) { index = this.classList ? this.classList.findIndex(i => i.age === this.studAge) : -1; }
    try {
      classAge = this.classList[index].id;
      this.classValue = classAge;   
    } 
    catch (error) {
      console.log("Catch");
      index = this.classList ? this.classList.findIndex(i => i.age === 0) : -1;
    }
    this.classValue = classAge;

    this.onClassChange();
    console.log(
      "index=" + index + "  classAge=" + classAge + "  age=" + this.studAge
    );
  }

  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] //dd/MM/yyyy
  };

}
