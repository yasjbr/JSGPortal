import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardComponent } from './dashboard.component';
import { TilesComponent } from './tiles/tiles.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { TodoComponent } from './todo/todo.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TeamComponent } from './team/team.component';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
//import { StudyYearComponent } from './study-year/study-year.component';
//import { StudyYearComponent } from './StudyYear/study-year/study-year.component';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    I18nModule
  ],
  declarations: [
    DashboardComponent,
    TilesComponent,
    InfoCardsComponent,
    DiskSpaceComponent,
    TodoComponent,
    AnalyticsComponent,
    TeamComponent,
    //StudyYearComponent
  ]
})
export class DashboardModule { }
