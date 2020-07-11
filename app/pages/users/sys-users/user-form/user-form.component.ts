import { Component, OnInit } from '@angular/core';
import { SysusersService } from '../sysusers.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { UsernameValidator } from './username.validator';


 

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {


  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/users/index';
  id: number;

  
  
  constructor(private service: SysusersService,
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.initForm();
    this.setupUpdate();
  }


   AvoidSpace(event) {
    const inputChar = String.fromCharCode(event).charCodeAt(0);
     console.log(inputChar+'--------------------------------mmmmm');
     
    var k = event 
    if (k == 32) return false;
}

  
  //Add
  addUser() {
    this.service.addUser(this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  
  submit() {
    
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
       
    this.loading = true;
    this.edit?this.updateUser():this.addUser();
     
  }
  public get name(): AbstractControl {
    return this.form.get('username');
  }




  initForm() {
    this.form = this.formbuilder.group({
      id: [0],
    //  username: ['', [Validators.required,UsernameValidator.cannotContainSpace()]],
      username:['', Validators.compose([Validators.required, UsernameValidator.cannotContainSpace])],   
      password: ['', [Validators.required]],
      email: [''],
      isSuperAdmin: [] ,
      isActive: ['True'] 
    })
    
  }


  get f(){
    return this.form.controls;
  }
   //Update
   setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.id = +params.id;
      this.edit = true;
      this.loading = true;
     
      this.service.getUserById(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
    
        console.log(res);
      }, err => console.log(err),
      () => this.loading = false);
    });
  }

  updateUser() {
    this.service.updateUser(this.id, this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }



}
