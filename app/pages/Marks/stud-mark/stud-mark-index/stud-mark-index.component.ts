import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { StudMark } from 'src/app/Models/Marks/StudMark';
import { StudMarkService } from '../stud-mark.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { StudMarkDialogComponent } from '../stud-mark-dialog/stud-mark-dialog.component';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';

@Component({
  selector: 'app-stud-mark-index',
  templateUrl: './stud-mark-index.component.html',
  styleUrls: ['./stud-mark-index.component.scss']
}) 
export class StudMarkIndexComponent implements OnInit {

  searchForm: FormGroup;
  yearsList: any;
  schoolId: any;
  classList: lkpClass[];
  // examList: Lkplookup[];
  termsList: Lkplookup[];
  sectionsList: any;
  public currentYear: number;
  schoolList: any;
  datasource: MatTableDataSource<StudMark>;

  cols = [
    // { field: "id", header: '$$' },
    // { field: "yearId", header: "yearId" },
    // { field: "mark", header: "mark" },
    { field: "studentId", header: "studentId" },
    { field: "studentName", header: "studentName" },
    { field: "mark", header: "mark" }

  ]



  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  public dataFilter = (value: string) => this.datasource.filter = value.trim().toLocaleLowerCase();


  constructor(private service: StudMarkService,
     private fb: FormBuilder,
     private yearService: YearService,
    private classService: ClassService,
    private lookup: LookupsApiService,
    private sectionService: SectionService,
    private schoolService: SchoolService,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog
    ) {
    this.datasource = new MatTableDataSource<StudMark>();
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.currentYear = currentUser.yearId;
  }



  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      switch (element[0].typeId) {
        // case LookupTypes.Exam:
        //   this.examList = element;
        case LookupTypes.Terms:
          this.termsList = element;
        default:
          break;
      }
    });
  }

  private getLookups() {
    this.lookup
      .getLookupsByType2([
       // LookupTypes.Exam,
        LookupTypes.Terms
      ])
      .subscribe(
        res => this.fillLookups(res),
        _err => {
          console.log("Error");
        },
        () => {
          console.log("Complite");
        }
      );
  }


  getStudMarkListBySearchForm() {
    console.log('-----------Fired------------' + this.searchForm.get('yearId').value);
    console.log('-----------Fired------------' + this.searchForm.get('classId').value);
    console.log('-----------Fired------------' + this.searchForm.get('termId').value);
    
    this.service.GetStudMarksByParam(this.searchForm.value).subscribe(res => this.datasource.data = res)

  }

  
  initSearchForm() {

    // console.log('----year from form----' + this.form.get('yearId').value);
    // console.log('----classId from form----' + this.form.get('classId').value);

    this.searchForm = this.fb.group({
      yearId: [Number(this.currentYear)],
      schoolId:[Number(this.schoolId)],
      sectionId: [0],
      classId: [],
      termId: []
    })
  }
  

  onSearch() {
    // this.getYealyCourseList();
     this.getStudMarkListBySearchForm();
  }

  getStudMarksList() {
    this.service.getStudMarksList().subscribe(
      result => {
        this.datasource.data = result
        console.log(result[0].mark + 'markkkkkkkkkkkk');
        
      },
      () => console.log(this.datasource.data)
    )
  }


  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
    //this.onSearch();
  }

  getSchoolList(){
    console.log('schoooooooooo' + this.schoolId);
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
   this.getSectionsList();
   this.onSearch();

  }

  getSectionsList() {
    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  ngOnInit() {

    this.getStudMarksList();
    this.getSchoolList();
    this.getSectionsList();
    this.initSearchForm();
    this.getYearsList();
    this.getClassList();
    this.getLookups();
  }

  getYearsList() {
    this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }


  getClassList() {
    return this.classService.GetClassBySchool(this.schoolId).subscribe(res => this.classList = res);
  }



  
  openUpdateStudMarkDialog(StudMarkId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.disableClose = true;
    dialogConfig.closeOnNavigation = false;

    dialogConfig.data = {
      id: StudMarkId,
      
    };
    const dialogRef = this.dialog.open(StudMarkDialogComponent, dialogConfig);
  }


}
