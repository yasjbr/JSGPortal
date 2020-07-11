import { Component, OnInit } from '@angular/core';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { RegParentService } from '../reg-parent.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.scss']
})
export class ParentViewComponent implements OnInit {


 public parents:regParents;
 
  id:number;
  edit=false;
  loading=false;
  form:FormGroup;
  
  constructor(
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: RegParentService,
    private route: ActivatedRoute) {

    
      this.parents=new regParents();
     
      
     }

  ngOnInit() {

    this.viewData();
  }

  viewData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.id = +params.id;
     
      this.loading = true;
    
      this.service.getParent(this.id).subscribe(res => {
        console.log(res);
        
        this.parents=res      
      }, err => console.log(err),
      () => this.loading = false);
    });
  }
}
