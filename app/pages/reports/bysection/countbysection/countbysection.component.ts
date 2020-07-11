import { StudCardData } from "./../../../../Models/Reg/Reports/StudCardData";
import { Component, OnInit } from "@angular/core";
import { RepService } from "../../rep.service";
import { users } from "src/app/Models/Users/users";
import { CurrentUserService } from "src/app/shared/services/current-user.service";
import { SchoolService } from "src/app/pages/addLookups/schools/school.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ReportsService } from "../../reports.service";
@Component({
  selector: "app-countbysection",
  templateUrl: "./countbysection.component.html",
  styleUrls: ["./countbysection.component.scss"]
})
export class CountbysectionComponent implements OnInit {
  StudentCountList: StudCardData[];
  name: string;
  image: any;
  schoolId: any;
  Total:number;
  public DateAndTime = new Date();
  constructor(
    private currentUserService: CurrentUserService,
    private sectionService: RepService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private reportsService: ReportsService
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
  }
  ngOnInit() {
    this.GetStudCountBySection(6);
  }
  print(div) {
    this.reportsService.print(div);
  }
  GetStudCountBySection(YearId) {
    return this.sectionService
      .GetStudCountBySection(this.schoolId , YearId)
      .subscribe(res => {
        this.StudentCountList = res;
        // this.total +=this.StudentCountList.studCount;
        this.getImage();
        // console.log("Total is = ", this.getTotal());
        this.Total=this.getTotal();
        

      });
  }
  getTotal() {
    let total = 0;
    for (let i = 0; i < this.StudentCountList.length; i++) {
      // console.log("res = ", this.StudentCountList[i].studCount);
      total += this.StudentCountList[i].studCount;  
    }
    return total;
  }
  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
