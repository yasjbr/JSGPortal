import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LoginService } from './login.service';
import { ValidationBase } from 'src/app/validationBase';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { SchoolService } from '../addLookups/schools/school.service';
import { I18nService } from 'src/app/shared/i18n/i18n.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;


  public form: FormGroup;
  public settings: Settings;
  validLogin = false;
  msgLogin: any;
  loading = false;

  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router,
    private service: LoginService,
    public validator: ValidationBase,
    private currentUserService: CurrentUserService,
    private schoolService: SchoolService,
    private i18nService: I18nService
  ) {
    this.settings = this.appSettings.settings;
     
    this.form = this.fb.group({
      userName: [null, [Validators.required /*, userNameValidator*/]],
      password: [null, [Validators.required, Validators.minLength(4)]
      ],
      rememberMe: false
    });
  }
  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': 0,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };
    this.myParams = {
      particles: {
        number: {
          value: 80,
          "density": {
            "enable": true,
            "value_area": 500
          }
        },
        color: {
          value: 'random',
          "opacity": {
            "value": 1,
            "random": true, // Set to false in our case
            "anim": {
              "enable": true,
              "speed": 8,
              "opacity_min": 0.4,
              "sync": false
            }
          }
        },
        
        shape: {
          type: ["circle","edge","polygon"],
          "stroke": {
            "width": 4,
            "color": "#fff"
         },
         "polygon": {
            "nb_sides": 6
         },
         "line_linked": {
          "enable": true,
          "distance": 200,
          "color": "#fff",
          "opacity": 1,
          "width": 4
        },
        
        },
      }
    };
  }
  public onSubmit(): void {
    if (this.form.valid) {
      // console.log(this.form.value);
      this.loading = true;
      this.msgLogin = '';

      this.service.login(this.form.value).subscribe(res => {
        if (res && res.token) {
          localStorage.setItem('token', JSON.stringify(res));
          const userId = this.currentUserService.User.id;

          // this.getUserImage();

          let objectURL = 'src/app/assets/img/avatars/avatar.png';
          const id = this.currentUserService.User.schoolId;
          this.schoolService.getSchool(id).subscribe(school => {
            if (school.imageFile) {
              objectURL = 'data:image/jpeg;base64,' + school.imageFile;
              // console.log('objectURL: ', objectURL);
            }
            localStorage.setItem('userImage', objectURL);
            this.currentUserService._userImage.next(objectURL);
            this.service.getUserMenu(userId).subscribe(menuList => {
              localStorage.setItem('MenuToken', JSON.stringify(menuList));
              this.router.navigate(['../dashboard']);
            });
          });
          // console.log('objectURLAfter: ', objectURL);

        } else {
          this.msgLogin = this.i18nService.getTranslation('Invalid user name or password');
          this.loading = false;
          return;
        }
      },
        err => this.loading = false,
        () => {
          this.loading = false;
        });
    }
  }

  getUserImage() {

    // Get school image
    let objectURL = 'src/app/assets/img/avatars/avatar.png';
    const id = this.currentUserService.User.schoolId;
    this.schoolService.getSchool(id).subscribe(res => {
      if (res.imageFile) {
        objectURL = 'data:image/jpeg;base64,' + res.imageFile;
        // console.log('objectURL: ', objectURL);
      }
      localStorage.setItem('userImage', objectURL);
    });
    // console.log('objectURLAfter: ', objectURL);
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  get userName(): AbstractControl {
    return this.form.get('userName');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

}
