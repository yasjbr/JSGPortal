import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from 'src/app/shared/i18n/i18n.service';
import { JsonApiService } from 'src/app/core/json-api.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-flags-menu',
  templateUrl: './flags-menu.component.html',
  styleUrls: ['./flags-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent implements OnInit {

  public languages: Array<any>;

  public currentLanguage: any;

  store: any;

  private sub: Subscription;

  constructor(private i18n: I18nService, private jsonApi: JsonApiService) { }

  ngOnInit() {
    this.jsonApi.fetchLanguages()
      .subscribe(res => {
        this.languages = res;
      });

    this.currentLanguage = this.i18n.currentLanguage;
 
  }

  ngOnDestroy() {
  }

  setLanguage(language) {
    this.currentLanguage = language;

    this.i18n.setLanguage(language);

    localStorage.setItem('locale', language.key);
    localStorage.setItem('sm-rtl', language.dir === 'rtl' ?  'true' : 'false');
    location.reload();
  }
}
