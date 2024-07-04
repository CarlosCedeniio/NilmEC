import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDefaultRoutingModule } from './dashboard-default-routing.module';
import { DashboardDefaultComponent } from './dashboard-default.component';
import {SharedModule} from '../../../shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { NgxSpinnerModule } from "ngx-spinner";
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';




@NgModule({
  imports: [
    CommonModule,
    DashboardDefaultRoutingModule,
    SharedModule,
    ChartModule,
    NgxSpinnerModule,
    CalendarModule,
    FormsModule,
    ButtonModule
  ],
  declarations: [DashboardDefaultComponent]
})
export class DashboardDefaultModule { }
