import { Component, OnInit, ViewChild } from '@angular/core';
import { RepService } from '../rep.service';
import { ReportsNames } from 'src/app/Models/Reports/ReportsNames';
import { Router } from '@angular/router';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({ 
  selector: 'app-reports-names',
  templateUrl: './reports-names.component.html',
  styleUrls: ['./reports-names.component.scss']
})
export class ReportsNamesComponent implements OnInit {

  @ViewChild('jqxProgramList') jqxProgramList: jqxDropDownListComponent;

  dir = 'right';
  public Adapter;

  userId:any;

  cssHeader(header) {
    header.css("font-weight", "bold");
    header.css("font-size", "16px");
    header.css('color', 'black');
  }

  public Fields = [
    { name: 'id', type: 'number' },
    { name: 'reportName', type: 'date' },
    { name: 'description', type: 'string' },
   // { name: 'code', type: 'string' },
    { name: 'link', type: 'string' },
    { name: 'active', type: 'number' },
   // { name: 'programId', type: 'number' },
    //{ name: 'version', type: 'number' },
   // { name: 'icon', type: 'number' }
  ]

  iconrenderer = (row: number, column: any, value: any): any => {

    return '<div style="text-align: center"><mat-icon class="mat-icon notranslate material-icons mat-icon-no-color" role="img" aria-hidden="true">' + value + '</mat-icon></div>'
  }

  public Columns: any[] = [
    { text: ' # ', datafield: 'id', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    //{ text: 'رمز  ', datafield: 'icon', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) }, cellsrenderer: this.iconrenderer },
    { text: 'إسم التقرير  ', datafield: 'reportName', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    { text: 'الوصف  ', datafield: 'description', width:655,  align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
  //  { text: 'الكود  ', datafield: 'code', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
   // { text: 'البرنامج  ', datafield: 'programId', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
  //  { text: 'النسخة  ', datafield: 'version', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    {
      text: 'الإجراءات', datafield: 'Edit', width: '10%', columntype: 'button', align: this.dir, cellsalign: this.dir,
      cellsrenderer: (): string => {
        return 'معاينة';
      },
      buttonclick: (row: number) => {
        this.openReport(row);
      }
      , rendered: (header) => { this.cssHeader(header) }
    }
  ]

  ProgramList = [{ id: 0, name: 'جميع التقارير' }, { id: 1, name: 'تقارير التسجيل' }, { id: 2, name: 'تقارير المحاسبة' }, { id: 3, name: 'تقارير المستودعات' }];


  constructor(private srvice: RepService, private router: Router,
    private currentUserService: CurrentUserService,
    ) {

      let currentUser: users;
      this.currentUserService.user.subscribe(user => currentUser = user);
      this.userId = currentUser.id;
     }

  ngOnInit() {
    console.log(this.userId+'------------------user issssssssss');
    
    this.getReportsList(0,this.userId);
  }

  ReportsList: ReportsNames[];
  getReportsList(val,userId) {

    return this.srvice.GetReportsListByUser(val,userId).subscribe(res => {
      this.ReportsList = res;

      this.fxGridData(res);
    })
  }
  onReportListChange() {
    let programId = this.jqxProgramList.getSelectedItem().value;
    this.getReportsList(programId,this.userId);
  }

  openReport(index) {
 
    let repUrl = this.ReportsList[index].link;
    console.log('repUrl=' + repUrl)
    this.router.navigateByUrl(repUrl);

  }


  fxGridData(res) {
    let source: jqwidgets.GridSource = {
      localdata: res,
      datafields: this.Fields,
      datatype: "json"
    }
    this.Adapter = new jqx.dataAdapter(source);
  }


}
