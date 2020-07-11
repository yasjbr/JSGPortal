import { DomSanitizer } from '@angular/platform-browser';

import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../reports.service';
import { studentNationalData } from 'src/app/Models/Reg/Reports/studentNationalData';
import { NationalrepService } from '../by-nationality/nationalrep.service';
import { SchoolService } from '../../addLookups/schools/school.service';
import { Items } from 'src/app/Models/Stock/Items';
import { StockService } from '../../stock/stock.service';

@Component({
  selector: 'app-rep-item-not-received',
  templateUrl: './rep-item-not-received.component.html',
  styleUrls: ['./rep-item-not-received.component.scss']
})
export class RepItemNotReceivedComponent implements OnInit {
  StudentList:studentNationalData[];
  public DateAndTime=new Date();
  name:string;
  image: any;
  schoolId: any;
  ItemList: any;
  data:Items[];

  constructor(

    private nationalServ:NationalrepService,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private stockService: StockService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,


  ) { 

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name= currentUser.username;
    this.schoolId = currentUser.schoolId;

   }

  ngOnInit() {
    this.GetItemNotReceived();
  }
  print(div) {
    this.reportsService.print(div);
  }

  GetItemNotReceived(){
    return this.stockService.GetItemNotReceived().subscribe( res => {
      this.data=res;
      console.log('res:',res);
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



