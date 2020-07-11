import { LoginComponent } from './pages/login/login.component';
// import { NgxEnterKeyModule } from 'ngx-enter-key';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { TopInfoContentComponent } from './theme/components/top-info-content/top-info-content.component';
import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { FavoritesComponent } from './theme/components/favorites/favorites.component';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { LoginService } from './pages/login/login.service';

import { AuthGuard } from './auth/auth-guard.service';
import { LayoutService } from './theme/components/layout.service';
import { I18nModule } from './shared/i18n/i18n.module';
import { TokenInterceptor } from './auth/httpconfig.interceptor';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './shared/file-upload-dialog/file-upload-dialog.component';
import { MessageService } from './shared/messages/message.service';
import { NotificationService } from './shared/messages/notification.service';
// import { ItemNotRceivedComponent } from './pages/stock/item-not-rceived/item-not-rceived.component';

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
} from '@angular/material';



import { CdkTableModule } from '@angular/cdk/table';
import { PreviousdebtsComponent } from './pages/financial/previousdebts/previousdebts.component';
import { NgxDatatableModule } from 'projects/swimlane/ngx-datatable/src/public-api';
import { BasicAutoComponent } from './basic/basic-auto.component';
import { BasicFixedComponent } from './basic/basic-fixed.component';
import { InlineEditComponent } from './basic/inline.component';
import { VirtualScrollComponent } from './basic/virtual.component';
import { HorzVertScrolling } from './basic/scrolling.component';
import { MultipleTablesComponent } from './basic/multiple.component';
import { RowDetailsComponent } from './basic/row-detail.component';
import { ResponsiveComponent } from './basic/responsive.component';
import { FilterBarComponent } from './basic/filter.component';
import { DarkThemeComponent } from './basic/dark-theme.component';
import { TabsDemoComponent } from './basic/tabs.component';
import { LiveDataComponent } from './basic/live.component';
import { RxDemoComponent } from './basic/rx.component';
import { ContextMenuDemoComponent } from './basic/contextmenu.component';
import { RowCssComponent } from './basic/css.component';
import { DynamicHeightComponent } from './basic/dynamic-height.component';
import { FooterDemoComponent } from './basic/footer.component';
import { RowGroupingComponent } from './basic/row-grouping.component';
import { BootstrapThemeComponent } from './basic/bootstrap.component';
import { FullScreenTreeComponent } from './tree/fullscreen.component';
import { ClientPagingComponent } from './paging/paging-client.component';
import { ServerPagingComponent } from './paging/paging-server.component';
import { PagingScrollingNoVirtualizationComponent } from './paging/paging-scrolling-novirtualization.component';
import { ServerScrollingComponent } from './paging/scrolling-server.component';
import { ClientSortingComponent } from './sorting/sorting-client.component';
import { DefaultSortingComponent } from './sorting/sorting-default.component';
import { ServerSortingComponent } from './sorting/sorting-server.component';
import { SortingComparatorComponent } from './sorting/sorting-comparator.component';
import { CellSelectionComponent } from './selection/selection-cell.component';
import { MultiSelectionComponent } from './selection/selection-multi.component';
import { InlineTemplatesComponent } from './templates/template-dom.component';
import { TemplateRefTemplatesComponent } from './templates/template-obj.component';
import { ColumnFlexComponent } from './columns/column-flex.component';
import { ColumnToggleComponent } from './columns/column-toggle.component';
import { ColumnStandardComponent } from './columns/column-standard.component';
import { ColumnForceComponent } from './columns/column-force.component';
import { ColumnPinningComponent } from './columns/pinning.component';
import { ColumnReorderComponent } from './columns/column-reorder.component';
import { VirtualPagingComponent } from './paging/paging-virtual.component';
import { SingleSelectionComponent } from './selection/selection-single.component';
import { MultiDisableSelectionComponent } from './selection/selection-disabled.component';
import { CheckboxSelectionComponent } from './selection/selection-chkbox.component';
import { CustomCheckboxSelectionComponent } from './selection/selection-chkbox-template.component';
import { MultiClickSelectionComponent } from './selection/selection-multi-click.component';
import { ClientTreeComponent } from './tree/client-tree.component';
import { SummaryRowSimpleComponent } from './summary/summary-row-simple.component';
import { SummaryRowCustomTemplateComponent } from './summary/summary-row-custom-template.component';
import { SummaryRowServerPagingComponent } from './summary/summary-row-server-paging.component';
import { SummaryRowInlineHtmlComponent } from './summary/summary-row-inline-html.component';
import { CurrentUserService } from './shared/services/current-user.service';
import { SchoolService } from './pages/addLookups/schools/school.service';
import { ComponentComponent } from './component/component.component';

//import { ReturnedVoucherComponent } from './returned-voucher/returned-voucher.component';
//import { RepVoucherComponent } from './rep-voucher/rep-voucher.component';
//import { RepVoucherBySupplierComponent } from './rep-voucher-by-supplier/rep-voucher-by-supplier.component';
// import { RepItemNotReceivedComponent } from './rep-item-not-received/rep-item-not-received.component';


 
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // NgxEnterKeyModule,

    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0'
    }),

    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    })  
    ,
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    SharedModule,
    I18nModule,
    PipesModule,
    routing,
    FlexLayoutModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    GridModule
  ],
  declarations: [
    InlineEditComponent,
    AppComponent,
    PagesComponent,
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    ErrorComponent,
    TopInfoContentComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FavoritesComponent,
    DeleteDialogComponent,
    FileUploadDialogComponent,
    // StudMarksComponent,

    // StudMarkIndexComponent,
    // StudMarkComponent,
    // PreviousdebtsComponent,
    // AddEmployeeComponent,
    // PayWithOutReceivingBooksComponent,
    // ReturnedVoucherComponent,
    //RepVoucherComponent,
    //RepVoucherBySupplierComponent,
    // RepItemNotReceivedComponent,

    AppComponent,
    BasicAutoComponent,
    BasicFixedComponent,
    FullScreenComponent,
    FullScreenTreeComponent,
    InlineEditComponent,
    VirtualScrollComponent,
    HorzVertScrolling,
    MultipleTablesComponent,
    RowDetailsComponent,
    ResponsiveComponent,
    ClientPagingComponent,
    ServerPagingComponent,
    PagingScrollingNoVirtualizationComponent,
    ServerScrollingComponent,
    ClientSortingComponent,
    DefaultSortingComponent,
    ServerSortingComponent,
    SortingComparatorComponent,
    CellSelectionComponent,
    MultiSelectionComponent,
    InlineTemplatesComponent,
    TemplateRefTemplatesComponent,
    ColumnFlexComponent,
    ColumnToggleComponent,
    ColumnStandardComponent,
    ColumnForceComponent,
    ColumnPinningComponent,
    ColumnReorderComponent,
    FilterBarComponent,
    VirtualPagingComponent,
    DarkThemeComponent,
    TabsDemoComponent,
    SingleSelectionComponent,
    LiveDataComponent,
    MultiDisableSelectionComponent,
    RxDemoComponent,
    ContextMenuDemoComponent,
    CheckboxSelectionComponent,
    CustomCheckboxSelectionComponent,
    MultiClickSelectionComponent,
    RowCssComponent,
    DynamicHeightComponent,
    FooterDemoComponent,
    RowGroupingComponent,
    BootstrapThemeComponent,
    ClientTreeComponent,
    SummaryRowSimpleComponent,
    SummaryRowCustomTemplateComponent,
    SummaryRowServerPagingComponent,
    SummaryRowInlineHtmlComponent,
    ComponentComponent,
   
  


  ],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
    SharedModule
  ],
  entryComponents: [DeleteDialogComponent, FileUploadDialogComponent
  ],
  providers: [
    AuthGuard,
    HttpClient,
    LoginService,
    AppSettings,
    CurrentUserService,
    SchoolService,
    
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LayoutService,
    MessageService,
    NotificationService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
