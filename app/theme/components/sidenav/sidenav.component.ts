import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { MenuService } from "../menu/menu.service";
import { LoginService } from "src/app/pages/login/login.service";
import { users } from "src/app/Models/Users/users";
import { DomSanitizer } from "@angular/platform-browser";
import { SchoolService } from "src/app/pages/addLookups/schools/school.service";
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidenavComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation: true
  };

  public menuItems: Array<any>;
  public settings: Settings;
  image:  any;
  schoolName: any;
  currentYear: any;

  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngDoCheck() {
    if (this.settings.fixedSidenav) {
      if (this.psConfig.wheelPropagation === true) {
        this.psConfig.wheelPropagation = false;
      }
    } else {
      if (this.psConfig.wheelPropagation === false) {
        this.psConfig.wheelPropagation = true;
      }
    }
  }

  public closeSubMenus() {
    const menu = document.getElementById('vertical-menu');
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        const child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

  getCurrentUser() {
    let currentUser: users;
    const locale = localStorage.getItem('locale');
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolName = locale === 'ar' ? currentUser.arSchoolName : currentUser.enSchoolName;
    this.currentYear = currentUser.yearName;

    // Get user image
    this.currentUserService._userImage.subscribe(image => this.image = image);
    // this.image = localStorage.getItem('userImage');
    // if (this.image && (this.image as string).indexOf('data:') !== -1) {
      this.image = this.sanitizer.bypassSecurityTrustUrl(this.image);
    // }
    console.log('imageFromSideNav: ', this.image);

  }
}
