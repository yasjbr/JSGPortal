import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  dir: string;
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appsettings: AppSettings) {
    // this.getDirection();
    this.name = data.name;
  }

  ngOnInit() {
  }

  private getDirection() {
      this.dir = this.appsettings.settings.rtl ? 'rtl' : 'ltr';
  }

}
