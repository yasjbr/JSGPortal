import { Component, OnInit } from '@angular/core';
import { FinItemService } from 'src/app/pages/financial/fin-item/fin-item.service';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { startWith, map, filter } from "rxjs/operators";
import { of } from 'rxjs';

@Component({
  selector: 'app-rep-fin-index',
  templateUrl: './rep-fin-index.component.html',
  styleUrls: ['./rep-fin-index.component.scss']
})
export class RepFinIndexComponent implements OnInit {

  finItemFilterValue: any;
  ngxfinItemList: FinItem[];
  constructor(private finItemService: FinItemService) { }
  finItemDataSource: any
  ngOnInit() {
    this.getFinItemList()
  }

  getFinItemList() {
    return this.finItemService.getFinItemList().subscribe
      (res => {
        this.finItemDataSource = res,
          console.log(res);
      })

  }


  filterClasses() {
    const ngxClassTable = of(this.ngxfinItemList);
    console.log('this.ngxClassList');
    console.log(this.ngxfinItemList);
    console.log(this.finItemFilterValue);


    ngxClassTable.pipe(
      map(p => p.filter(x => {
        x.desc.includes(this.finItemFilterValue) ||
          x.id.toString().includes(this.finItemFilterValue)
          
      }))
    ).subscribe(res => {
      this.finItemDataSource = res,
        console.log(res)
    })

  }

  onFinItemChange() {
    
  }

}
