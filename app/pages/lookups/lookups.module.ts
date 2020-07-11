import { lookupRoutes } from './lookup.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsComponent } from './lookups.component';
import { LookupsListComponent } from './lookups-list/lookups-list.component';
import { NewsComponent } from './news/news.component';
import { LookupsIndexComponent } from './lookups-index/lookups-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LookupsFormComponent } from './lookups-form/lookups-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LookupTypeComponent } from './lookup-type/lookup-type.component';

@NgModule({
  declarations: [
    LookupsComponent,
    LookupsListComponent,
    NewsComponent,
    LookupsIndexComponent,
    LookupsFormComponent,
    LookupTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(lookupRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LookupsModule { }
