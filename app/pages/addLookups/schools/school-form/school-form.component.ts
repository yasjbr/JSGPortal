import { SchoolService } from './../school.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss']
})
export class SchoolFormComponent implements OnInit {
  show=true;
  schoolForm: FormGroup;
  loading = false;
  edit = false;
  storeForm: FormGroup;
  returnUrl = '/schools/index';
  id: number;
  cityList: any;
  image: any;

  constructor(private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: SchoolService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.getCity();
    this.initForm();
  }


  initForm() {
    this.schoolForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      address: [''],
      tel: [''],
      mobile: [''],
      fax: [''],
      // city:[''],
      webPage: [''],
      faceBook: [''],
      youTube: [''],
      twitter: [''],
      cityId: [''],
      description: [''],
      // engDescription: [''],
      poBox: ['']
    });
  }


  submit() {

    if (!this.schoolForm.valid) {
      this.validator.markFormTouched(this.schoolForm);
      return;
    }

    this.loading = true;

    // this.edit ? this.updateLookup() : this.addLookup();
    this.edit ? this.updateSchool() : this.addSchool();
  }


  addSchool() {
    this.service.addSchool(this.schoolForm.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  getCity() {
    this.service.getCityList().subscribe(
      get => this.cityList = get,
      err => console.log("get city list error"),
      () => console.log("comlite")
    );

  }

  viewSchool() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.show = false;
      this.id = +params.id;
      this.edit = true;
      this.loading = true;
      this.service.getSchool(this.id).subscribe(res => {
        this.schoolForm = this.validator.patchForm(this.schoolForm, res);
      }, err => console.log(err),
        () => this.loading = false);
    });
  }


  updateSchool() {
    this.service.updateSchool(this.id, this.schoolForm.value).subscribe(
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
      this.service.getSchool(this.id).subscribe(res => {
        this.schoolForm = this.validator.patchForm(this.schoolForm, res);


        const objectURL = 'data:image/jpeg;base64,' + res.imageFile;
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);


      }, err => console.log(err),
        () => this.loading = false);
    });
  }

  public get name(): AbstractControl {
    return this.schoolForm.get('name');
  }
  ngOnInit() {

    this.setupUpdate();
    this.viewSchool();
  }



}
