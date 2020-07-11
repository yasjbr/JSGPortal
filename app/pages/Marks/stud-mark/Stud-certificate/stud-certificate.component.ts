import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { ActivatedRoute } from '@angular/router';
import { RepService } from 'src/app/pages/reports/rep.service';
import { StudMarkService } from '../stud-mark.service';
import { StudCourseMark } from 'src/app/Models/Marks/StudCourseMark';
import { StudCourseMarkService } from '../../stud-course-mark/stud-course-mark.service';
import { StudMark } from 'src/app/Models/Marks/StudMark';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';
import { StudCourseExamService } from '../../stud-course-exam/stud-course-exam.service';
import { StudCourseExam } from 'src/app/Models/Marks/StudCourseExam';

@Component({
  selector: 'app-certificate',
  templateUrl: './stud-certificate.component.html',
  styleUrls: ['./stud-certificate.component.scss']
})
export class StudCertificateComponent implements OnInit {


  image: any;
  DateAndTime = new Date();
  name: string;
  schoolId: any;
  schoolName: any;
  schoolLName: any;
  yearId: any = '6';
  studentId: any;
  crsmrk = [];
  crsexam  : StudCourseExam [] = [];
  studinfo = StudCardData;
  studentInfoDataSource: any
  studMarks: StudMark[];
  studCourseMarksList: StudCourseMark[];
  studCourseExamsList: StudCourseExam[];
  yearName: any;
  // certModel: any;
  displayedColumns: string[] = ['courseName', 'mark', 'maxMark', 'minMark', 'note'];

  constructor(private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService,
    private repService: RepService,
    private route: ActivatedRoute,
    private studMarkService: StudMarkService,
    private studCourseMarkService: StudCourseMarkService,
    private reportsService: ReportsService,
    private studCourseExamService: StudCourseExamService) {

    let currentUser: users;
    this.currentUserService.user.subscribe(res => currentUser = res);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    //this.yearId = currentUser.yearId;
    this.yearName = currentUser.yearName;


    this.name = currentUser.username;
  }


  print(div) {
    this.reportsService.print(div);
  }

  ngOnInit() {
    this.getStudentInfo();
    this.getImage();
  }


  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }


  getStudMarks(markId: number) {
    this.studMarkService.GetStudMarksById(markId).subscribe(res => {
      this.studMarks = res;//  Array.of(res),
      // console.log('studMark  first  ' + JSON.stringify(this.studMarks));

      for (let marksRecord of this.studMarks) {


        this.repService.getStudCardDataVw(this.yearId, marksRecord.studentId).subscribe(
          res => {
            //   this.studentInfoDataSource = res,
            marksRecord.studData = res
            // console.log('studMark after insert stud data   ' + JSON.stringify(marksRecord.studData.studName));
          }
        );


        this.studCourseMarkService.GetStudCourseMarkByParam(marksRecord).subscribe(res => {
          if (res != undefined && res != null) {
            for (var i = 0; i <= res.length - 1; i++) {
              this.crsmrk.push(res[i]);
            }
          }
          marksRecord.coursesMarks = this.crsmrk;
          ////////////////////////////////////////////////// get exams
          for (let courseRecord of marksRecord.coursesMarks) {

            this.studCourseExamService.getStudCoureExamByParam(courseRecord).subscribe(res => {
              // console.log('ressssssssssooooo' + res);
              console.log('courseRecord   ' + JSON.stringify(courseRecord));

              if (res != undefined && res != null) {
                for (var i = 0; i <= res.length - 1; i++) {
                  console.log('res i   ' + JSON.stringify(res[i]));
                  this.crsexam.push(res[i]);
                }
              }
              courseRecord.coursesExams = this.crsexam;
             // marksRecord.coursesMarks.coursesExams = courseRecord.coursesExams;
              // console.log('crsexam   ' + JSON.stringify(this.crsexam));
              // console.log('courseRecord.coursesExams   ' + JSON.stringify(courseRecord.coursesExams));
              console.log('marksRecord   ' + JSON.stringify(marksRecord));

              this.crsexam = [];
            })
          }
          /////////////////////////////////////////////////////// get exams

          this.crsmrk = [];
        })









      }

      console.log('studMark final  ' + JSON.stringify(this.studMarks));

      // this.repService.getStudCardDataVw(this.yearId, this.studentId).subscribe(
      //   res => {
      //     this.studentInfoDataSource = Array.of(res),
      //       console.log(this.studentInfoDataSource);
      //   }
      // );


      // this.studCourseMarkService.GetStudCourseMarkByParam(this.studMarks).subscribe(res => {
      //   this.studCourseMarksList = res
      // })

    },
      err => {
        console.log(err);
      })
  }




  getStudentInfo() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.getStudMarks(params.id);
      // this.getStudCourseMarksList();
    });
  }


}
