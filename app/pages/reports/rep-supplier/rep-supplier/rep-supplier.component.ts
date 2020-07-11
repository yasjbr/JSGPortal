import { Component, OnInit } from '@angular/core';
import { Suppliers } from 'src/app/Models/Stock/Suppliers';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SupplierService } from 'src/app/pages/supplier/supplier.service';
import { ReportsService } from '../../reports.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-rep-supplier',
  templateUrl: './rep-supplier.component.html',
  styleUrls: ['./rep-supplier.component.scss']
})
export class RepSupplierComponent implements OnInit {
  supplierList:Suppliers[];
  schoolId: any;
  image: any;
  public DateAndTime=new Date();
  name:string;
  constructor(

    private service: SupplierService,
    private reportsService: ReportsService,
    private schoolService: SchoolService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private currentUserService:CurrentUserService,
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name= currentUser.username;
    this.schoolId = currentUser.schoolId;
   }

  ngOnInit() {
    this.GetSupplier();
    this.getImage();
  }


  GetSupplier() {
    return this.service.GetSupplier().subscribe(res=>{
      this.supplierList=res;
      console.log(res);
    })
      }

      print(div) {
        this.reportsService.print(div);
      }

      getImage() {
        this.schoolService.getSchool(this.schoolId).subscribe(res => {
          let objectURL = "data:image/jpeg;base64," + res.imageFile;
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      }
      

}
