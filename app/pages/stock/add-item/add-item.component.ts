import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Items } from 'src/app/Models/Stock/Items';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { LookupsApiService } from '../../lookups/lookups-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SectionService } from '../../addLookups/sections/section.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ClassService } from '../../addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupTypes } from "src/app/Models/Enum/SystemEnum";
import { users } from 'src/app/Models/Users/users';
import { AdmDialogComponent } from '../../Admission/adm-dialog/adm-dialog.component';
import { AdmService } from '../../Admission/adm.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  schoolId: any;
  classId: number;
  name: string;
  schoolName: any;
  SectionId: any;
  yearId: any;
  sectionList: LkpSection[];
  ClassList: lkpClass[];
  groupList: Items[];
  sectionId:number;
 public form: FormGroup;
  loading = false;
  edit = false;
  returnUrl = "/Stock/ItemsStock";
  id: number=0;
  @Output() event = new EventEmitter<Items>(true);

  ItemList: Lkplookup[];
  statusList: Lkplookup[];
  TypeList: Lkplookup[];
  termList: Lkplookup[];

  constructor(
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private admservice: AdmService,

    private sectionService: SectionService,
    private currentUserService: CurrentUserService,
    private classService: ClassService,
    private service: StockService,

    public dialogRef: MatDialogRef<AddItemComponent>,

    private lookup: LookupsApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id=0;
    this.iniForm();
    
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
  }
  message: string;
  pp: string;

  
  ngOnInit() {
    this.getLookups();
    this.sectionListBySchool();
    this.getClassList(0);
   
    this.admservice.currentMessage.subscribe(message => {
      console.log('Message',this.message);
      this.message = message
    });
    this.setupUpdate();
  }

  sectionListBySchool() {
    return this.sectionService.sectionListBySchool(this.schoolId)
      .subscribe(res => {
        this.sectionList = res;
       try { this.form.get("SectionId").setValue(res[0].id) } catch(error) { };
        // console.log('section list: ',this.sectionList);
      });
  }
  getClassList(sectionId) {
    this.sectionId=sectionId;
    this.classService.GetClassBySection(sectionId).subscribe(res => {
      this.ClassList = res;
    //  try { this.form.get("ClassId").setValue(res[0].id) } catch(error) { };
      //  console.log('Classbysection',this.ClassList);
    });
  }

  newMessage() {
    let x = this.admservice.changeMessage("Hello from Sibling");
    // console.log(this.message);
  }
  iniForm() {
    console.log("id=" + this.id);
    this.form = this.formbuilder.group({

      id: [this.id],
      itemName: [null, [Validators.required]],
      classId: [null, [Validators.required]],
      grpId: [null, [Validators.required]],
     // sectionId: [null, [Validators.required]],
      itemTypeId: [null, [Validators.required]],
      itemStatusId: [null, [Validators.required]],
      termId: [null, [Validators.required]]
    });
  }
  addItem() {

    this.service.AddItem(this.form.value).subscribe(
      res => {
        this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
        //  this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  public get errName(): AbstractControl {
    return this.form.get("itemName");
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
    this.edit ? this.updateItem() : this.addItem();
    // /*this.edit?this.updateParent():*/ this.addItem();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      // console.log("Loop");
      switch (element[0].typeId) {
        case LookupTypes.ItemStatusId:
          this.statusList = element;
          break;
        case LookupTypes.ItemTypeId:
          this.TypeList = element;
          break;
        case LookupTypes.ItemName:
          this.ItemList = element;
          break;
        case LookupTypes.Terms:
          this.termList = element;
          break;

        default:
          break;
      }
    });
  }

  private getLookups() {
    this.lookup
      .getLookupsByType2([
        LookupTypes.ItemStatusId,
        LookupTypes.ItemTypeId,
        LookupTypes.ItemName,
        LookupTypes.Terms

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


 
  setupUpdate() {
    if (!this.data.id) return;
   
    this.id = this.data.id; // +params.id;
    this.edit = true;
    this.loading = true;
    this.service.getItembyId(this.id).subscribe(
      res => {
        console.log('setUp',res);
        this.form = this.validator.patchForm(this.form,res);
        console.log('formGtrup',this.form);
      },
      err => console.log(err),
      () => (this.loading = false)
    );
    //   });
  }
  updateItem() {
    //var id = this.data.id != null?this.data.id:"";
    this.service.ItemUpdate(this.id, this.form.value).subscribe(
      res => {
        this.dialogRef.close(this.form.value);
        // this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
}
