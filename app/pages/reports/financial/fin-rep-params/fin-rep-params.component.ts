import { format } from 'util';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { ClassService } from './../../../addLookups/classes/class.service';
import { LkpSection } from './../../../../Models/addLookups/sections/lkpSection';
import { SectionService } from './../../../addLookups/sections/section.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { users } from 'src/app/Models/Users/users';
import { FinItemService } from 'src/app/pages/financial/fin-item/fin-item.service';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { startWith, map, filter } from "rxjs/operators";
import { of } from 'rxjs';
import { StudentFeeFilter } from 'src/app/Models/financial/student-Fee-Filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { formatDate, DatePipe } from '@angular/common';



@Component({
  selector: 'app-fin-rep-params',
  templateUrl: './fin-rep-params.component.html',
  styleUrls: ['./fin-rep-params.component.scss']
})
export class FinRepParamsComponent implements OnInit {




  constructor(private finItemService: FinItemService,
    private fb: FormBuilder, private regParentService: RegParentService,
    private currentUserService: CurrentUserService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private sectionService: SectionService,
    private classService: ClassService,
    private lookupService: LookupsApiService)  {


    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.currentYearId = currentUser.yearId;
    this.currentYear = currentUser.yearName;


  }

  @ViewChild("pageRemanderFees") pageRemanderFees: ElementRef;
  
  filterParents: regParents[];
  parentList: regParents[];
  parentId: any;




  sectionList: any;
  classList: any;
  classSeqList: any;

  sectionId: any;
  classId: any;
  classSeqId: any;

  schoolId: any;
  classFilterValue: any;
  currentYearId: number;
  currentYear: any;
  schoolName: any;
  finItemDataSource: any
  parentListDatasource: regParents[];
  finItemFilterValue: any;
  ngxfinItemList: FinItem[];
  finItemId: any;
  selected: any;
  selectedOption: string;
  studentFeeFilter1: StudentFeeFilter;
  parametersForm: FormGroup;
  parametersForm2: FormGroup;
  parentFilterValue: any;
  ngxParentList: regParents[];
  image: any;

  reportId: any=1;

  paymentMethodList: any;

  ngOnInit() {
    this.getFinItemList();
    this.getPaymentMethods();
    this.initParamForm();
    this.initParamForm2();
    this.getParentList(1)
    this.parentFilterValue = '1';

  }

  submit() {

  }


  onParentChanged(parentId) {

    let index = this.parentList.findIndex(i => i.id === parentId);
    let parentName
    if (index != -1) {
      parentName = this.parentList[index] ? this.parentList[index].fatherName : "";
    }
    // console.log('------------------parentId=' + parentId + "   this.parentName=" + parentName);
    //let parentNameText = parentId.source.selected._element.nativeElement.innerText.trim();
    this.parametersForm.patchValue({ parentName: parentName, parentId: parentId })
    // console.log(this.parametersForm.value);
  }

  // filterParents() {
  //   console.log('filterParents');

  //   const ngxParentTable = of(this.ngxParentList);

  //   console.log('this.ngxParentList');
  //   console.log(this.ngxParentList);

  //   ngxParentTable.pipe(
  //     map(p => p.filter(x => x.fatherName.includes(this.parentFilterValue) ||
  //       x.id.toString().includes(this.parentFilterValue)))
  //   ).subscribe(res=>this.parentListDatasource=res)

  // }

  getFinItemList() {
    return this.finItemService.getShowItemInMenu().subscribe
      (res => {
        this.finItemDataSource = res
        //  console.log(res);
      })
  }
  getPaymentMethods() {
    return this.lookupService.getLookupsByType(45).subscribe(res => this.paymentMethodList = res);
  }


  getParentList(parentName) {
    return this.regParentService.getParentsList().subscribe(res => {
      this.parentList = res;


      this.filterParents = this.parentList;
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index] ? this.parentList[index].id : "";
        this.onParentChanged(this.selected);
      }
    });
  }

  // getParentsList() {
  //   return this.regParentService.getParentsList().subscribe
  //     (res => {
  //       this.parentListDatasource = res,
  //       console.log(res);
  //     })
  // }

 
  
  onFinItemChange(xfinItemId) {
    let finItemNameText = xfinItemId.source.selected._element.nativeElement.innerText.trim();
    this.parametersForm.patchValue({ finItemName: finItemNameText });

   
      this.parametersForm.patchValue({ finItemId: xfinItemId });
     
    

    this.finItemService.sFinItemId = xfinItemId.value;
    this.finItemId = xfinItemId;
  }





  initParamForm() { 
   
    this.parametersForm = this.fb.group(
      {
        finItemId: [''],
        finItemName: [''],
        voucherDateFrom: [],
        voucherDateTo: [],
        parentId: [''],
        parentName: [''],
        FinItemVoucherSequenceFrom: [],
        FinItemVoucherSequenceTo: [],
        reportType: [null],
        payMethod:['']

      });
  }


  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      // this.schoolForm = this.validator.patchForm(this.schoolForm, res);
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  getReportId(repId) {
   
    // let today = new Date();
    // let xToday = this.datePipe.transform(today, 'yyyy-MM-dd')
  

    // console.log("repId=" + repId);
    this.reportId = repId;
    this.parametersForm.patchValue({ reportType: this.reportId });
    this.parametersForm.patchValue({ finItemId: '' });
    
   
    if (repId == 2) {
     // this.parametersForm2.reset();
      this.getSectionList();
    }
    
    if (repId == 3) {
      // this.parametersForm2.reset();
       this.getSectionList();
     }
  }

  // ==========  Report 2 =====================

  initParamForm2() {
    this.parametersForm2 = this.fb.group(
      {
        schoolId: [this.schoolId],
        yearId: [this.currentYearId],
        sectionId: [''],
        classId: [''],
        classSeqId: ['']
      });
  }

  getSectionList() {
    this.sectionId = null;
    this.classId = null;
    this.classSeqId = null;
    this.parametersForm2.patchValue({ sectionId: null,classId:null,classSeqId:null })
    return this.sectionService.sectionBySchoolList(this.schoolId).subscribe(res => {
      this.sectionList = res;
      this.getClassList(res[0].id);
      this.getClassSeqList();
     
    });
  }

  getClassList(sectionId: number) {
    this.classId = null;
    this.classSeqId = null;
    this.parametersForm2.patchValue({ sectionId: sectionId, classId: null, classSeqId: null })
    
    return this.classService.GetClassBySection(sectionId).subscribe(res => {
    this.classList = res;
      this.getClassSeqList();
    })

  }
  getClassSeqList() {
    return this.lookupService.getLookupsByType(35).subscribe(res => this.classSeqList = res);
  }

  talkBack(e:any) {
    console.log("e"+e)
  }
  

}
