import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { I18nModule } from './i18n/i18n.module';
import { I18nService } from './i18n/i18n.service';
import { MatSelectCheckAllComponent } from './mat-select-check-all/mat-select-check-all.component';
import { MatSelectSearchComponent } from './mat-select-search/mat-select-search.component';
import { MatSelectSearchClearDirective } from './mat-select-search/mat-select-search-clear.directive';
import { jqxComboBoxModule }    from 'jqwidgets-ng/jqxcombobox';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxInputModule }    from 'jqwidgets-ng/jqxinput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxdatetimeinput';
import { jqxDropDownButtonModule } from 'jqwidgets-ng/jqxdropdownbutton';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
// import { RepModule } from '../pages/reports/rep.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    I18nModule,
  ],
  exports: [
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatSelectCheckAllComponent,
    MatSelectSearchComponent,
    ContentHeaderComponent,
    BreadcrumbComponent,
    I18nModule,
    jqxGridModule,
    jqxComboBoxModule,
    jqxInputModule,
    jqxWindowModule,
    jqxButtonModule,
    jqxDateTimeInputModule,
    jqxDropDownButtonModule,
    jqxDataTableModule,
    jqxDropDownListModule,
    NgSelectModule,
    FormsModule
    // RepModule
  ],
  declarations: [
    ContentHeaderComponent,
    BreadcrumbComponent,
    MatSelectCheckAllComponent,
    MatSelectSearchComponent,
    MatSelectSearchClearDirective
  ],
  providers: [I18nService]
})
export class SharedModule { }
