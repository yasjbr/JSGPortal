import { LoginService } from 'src/app/pages/login/login.service';
import { ClassService } from './../../../addLookups/classes/class.service';
import { Component, OnInit } from '@angular/core';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { users } from 'src/app/Models/Users/users';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';
import { ReportsService } from '../../reports.service';
import { ActivatedRoute } from '@angular/router';
import { RepService } from '../../rep.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from '@angular/core/src/render3';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-stud-class',
  templateUrl: './stud-class.component.html',
  styleUrls: ['./stud-class.component.scss']
})
export class StudClassComponent implements OnInit {

  name:string;
  schoolName: any;
  schoolLName: any;
  id: any;
  loading = false;
  yearId: any;
  yearName: any;
  image: any;
  schoolId: any;
  className: any;
  classSeqName: any;
  repId: any;
  repName: any;
  newStudList: any[] = [];
  approve:any=[];
  selectedStudData: StudCardData[];
  public DateAndTime=new Date();
  constructor(private reportsService: ReportsService,
    private route: ActivatedRoute,
    private service: RepService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    
    private currentUserService: CurrentUserService) {


    // let data = JSON.parse(localStorage.getItem("token")) as users;

    // //===========in development Mode=====================
    // this.schoolId = data.schoolId;
    // this.schoolName = data.schoolName;
    // this.yearName = data.yearName;
    // this.yearId = data.yearId;

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
    this.name= currentUser.username;
    // console.log('users :',currentUser);

    //=============in Production Mode must by uncomment==============
    //  this.schoolId = this.loginService.sSchoolId;
    //  this.schoolName = this.loginService.sSchoolName;
    //  this.yearName = this.loginService.sYearName;
    // this.yearId = this.loginService.sYearId;

  }

  ngOnInit() {
    this.getStudData();
    
  }

  print(div) {
    this.reportsService.print(div);
  }


  //Get Student Data
  getStudData() {
    this.route.params.subscribe(params => {
      // if (!params.id) {
      //   return;
      // }
      // this.id = +params.id;
      // console.log('student:',params);
      this.id = this.service.sClassId;
      this.repId = this.service.sRepId;
      console.log("this.repId=" + this.repId);
      if (this.repId == 1) {
        this.repName = "Detect phones and addresses";
      } else if (this.repId == 2) {
        this.repName = "Detect list name of students";
      } else if (this.repId == 3) {
        this.repName = "detection all phones";
      } else if (this.repId == 4) {
        this.repName = "Detect student status";
      } else if (this.repId == 5) {
        this.repName = "New Students Report";
      }else if (this.repId == 6) {
        this.repName = "Seats booking report";
      }


      this.service.GetClassStudents(this.yearId, this.id).subscribe(res => {
        this.selectedStudData = res;
        // console.log("data", res);
     
        this.className = res[0]   ?   res[0].className:"";
        this.classSeqName =res[0] ?   res[0].classSeqName: "";

        console.log("resalt Name ="+this.className);
        console.log("resalt section ="+this.classSeqName);

//         res.forEach(element => {
//           if (element.joinYearId == this.yearId) {
//             this.newStudList.push(element);
//           }


//         })
//         res.forEach(element=>{
//           if(element.ApprovedId == 1){
//             this.approve.push(element);
//           }
// })
      

      }, err => console.log(err),
        () => this.loading = false);

      this.getImage();
    });
  }



  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
