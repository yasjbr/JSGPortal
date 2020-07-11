import { Component, OnInit, Inject, EventEmitter, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { ValidationBase } from "src/app/validationBase";
import { Router, ActivatedRoute } from "@angular/router";
import { RegParentService } from "../../Reg/parents/reg-parent.service";
import { LookupsApiService } from "../../lookups/lookups-api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AdmDialogComponent } from "../adm-dialog/adm-dialog.component";
import { Lkplookup } from "src/app/Models/Lookups/lkplookup";
import { LookupTypes } from "src/app/Models/Enum/SystemEnum";
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { concatAll } from 'rxjs/operators'; 
import { log } from 'util';

function passwordMatchValidator(group: FormGroup): any {
  if (group) {

    if (group.get("firstName").value !== group.get("confirm").value) {
      return { notMatching: true };
    }
  }

  return null;
}


@Component({
  selector: "app-adm-parent",
  templateUrl: "./adm-parent.component.html",
  styleUrls: ["./adm-parent.component.scss"]
})
export class AdmParentComponent implements OnInit {
  form: FormGroup;
  loading = false;
  edit = false;
  returnUrl = "/admissions/index";
  id: number;
  ParentNameList: regParents[];
  fullName : string ="";
  currentYear: any;
  existFullName:boolean =false;
  @Output() event = new EventEmitter<regParents>(true);
 
  martialList: Lkplookup[];
  citiesList: Lkplookup[];
  religionsList: Lkplookup[];
  nationalList: Lkplookup[];
  countriesList: Lkplookup[];
  educationList: Lkplookup[];
  relationList: Lkplookup[];

  constructor(
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: RegParentService,
    private route: ActivatedRoute,
    private lookup: LookupsApiService,
    public dialogRef: MatDialogRef<AdmDialogComponent>,
    private currentUserService: CurrentUserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
    this.getLookups();
  }

  ngOnInit() {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);

    this.currentYear = currentUser.yearName;
  }

  initForm() {
    this.form = this.formbuilder.group({
      id: [0],

      firstName: ["", [Validators.required]], //
      secondName: ["", [Validators.required]], //
      familyName: ["", [Validators.required]], //
      religionId: [null, [Validators.required]], //
      nationalityId: [null], //
      cityId: [null], //
      locality1: [null], //
      locality2: [null], //
      address: [null], //
      street: [null], //
      buildingNo: [null], //
      tel: [null], //
      fatherMobile: [null], //
      idNum: [null],
      motherMobile: [null], //
      smsParent: [null], //
      smsMobile: [null], //
      parentWork: [null],



    });
  }

  addParent() {

    this.service.addParent(this.form.value).subscribe(
      res => {
        this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
        //   this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  submit() {
    //null;
  }


  submit2() {
   
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }

    this.loading = true;
    /*this.edit?this.updateParent():*/ this.addParent();
  }


   getParentNameList() {

    
    let f = this.form.get('firstName').value;
    let s = this.form.get('secondName').value;
    let m = this.form.get('familyName').value;
   this.fullName = f+' '+s+' '+m;

   console.log(this.fullName+'this.fullname --------------------');
    return this.service.GetParentByParentName(this.fullName).subscribe(res => {
      this.ParentNameList = res

      if (this.ParentNameList.length > 0){
        console.log('fiiiiiiiiiiiiiiiih' + this.ParentNameList.length );
        this.existFullName = true;
     
         return;
      }

      else{
        this.submit2();
      }
    });
    
  }








  public get name(): AbstractControl {
    return this.form.get("firstName");
  }


 


  closeDialog(): void {
    this.dialogRef.close();
  }

  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      //console.log("Loop");
      switch (element[0].typeId) {
        case LookupTypes.MartialStatus:
          this.martialList = element;
          break;
        case LookupTypes.Cities:
          this.citiesList = element;
          break;
        case LookupTypes.Religions:
          this.religionsList = element;
          break;
        case LookupTypes.Countries:
          this.countriesList = element;
          break;
        case LookupTypes.Nationalities:
          this.nationalList = element;
          defVal = element.findIndex(i => i.defaultValue === 1);
          try {
            value = element[defVal].id;
          } catch (error) { }
          this.form.get("nationalityId").setValue(value);
          break;
        case LookupTypes.EducationLevel:
          this.educationList = element;
          break;
        case LookupTypes.Relationships:
          this.relationList = element;
          break;
        default:
          break;
      }
    });
  }

  private getLookups() {
    this.lookup
      .getLookupsByType2([
        LookupTypes.MartialStatus,
        LookupTypes.Countries,
        LookupTypes.IdTypes,
        LookupTypes.Cities,
        LookupTypes.Religions,
        LookupTypes.HealthStatus,
        LookupTypes.BloodType,
        LookupTypes.PersonTitle,
        LookupTypes.Gender,
        LookupTypes.Nationalities,
        LookupTypes.EducationLevel,
        LookupTypes.Relationships
      ])
      .subscribe(
        res => this.fillLookups(res),
        _err => {
          console.log("Error");
        },
        () => {
          console.log("Complite");
        }
      );
  }







}
