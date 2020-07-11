import { LookupsApiService } from './../lookups-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationBase } from 'src/app/validationBase';
import { LookupTypeApiService } from '../lookup-type-api.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';

@Component({
  selector: 'app-lookups-form',
  templateUrl: './lookups-form.component.html',
  styleUrls: ['./lookups-form.component.scss']
})
export class LookupsFormComponent implements OnInit {

  loading = false;
  public lookupForm: FormGroup;
  returnUrl = '/lookups/index';
  edit = false;
  id: number;
  typeId: any;
  isActive:any;
  ConstantsStatusId:any;
  public ConstantsStatus:any[];
  indeterminate = false;
  // labelPosition: 'active' | 'inactive' = 'inactive';


  public typeList: any[]

  constructor(private service: LookupsApiService,
    private router: Router,
    public validator: ValidationBase,
    private fb: FormBuilder,
    private typeService: LookupTypeApiService,
    private route: ActivatedRoute) {
    this.initForm();
    this.getTypes();
    this.getStatus();
  }

  public getStatus() {
    this.service.getConstantsStatus().subscribe(
  
      get => { console.log(get), this.ConstantsStatus = get },
      err => console.log("get"),
      () => console.log("comlite")
    );
  }

  public getTypes() {
    return this.typeService.LookupTypes().subscribe(
      get => { console.log(get), this.typeList = get },
      err => console.log('error'),
      () => console.log('Complite')
    )
  }
  ngOnInit() {

   this.typeId = this.service.sTypeId;
   this.isActive = this.service.sTypeId;
    this.setupUpdate();

  }


  initForm() {
    this.lookupForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      value: [''],
      typeId: [, [Validators.required]],
      isActive: [true]

    });
  }


  addLookup(item) {
    this.service.addLookup(item).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  submit() {
    if (!this.lookupForm.valid) {
      this.validator.markFormTouched(this.lookupForm);
      return;
    }
    let item = this.lookupForm.value as Lkplookup
    this.loading = true;
    this.edit ? this.updateLookup(item) : this.addLookup(item);
  }

  updateLookup(item) {
    this.service.updateLookup(this.id, item).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }


  setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.id = +params.id;
      this.edit = true;
      this.loading = true;
      this.service.getLookup(this.id).subscribe(res => {
        console.log('rrrr',res);
        
        this.lookupForm = this.validator.patchForm(this.lookupForm, res);
      }, err => console.log(err),
        () => this.loading = false);
    });
  }


  public get name(): AbstractControl {
    return this.lookupForm.get('name');
  }

}
