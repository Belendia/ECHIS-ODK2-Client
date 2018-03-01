import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatCardModule } from '@angular/material';
import { PieChartComponent } from 'angular-d3-charts/src/pieChart.component';

import { AppRoutingModule } from './app-routing.module';
import { VillageProfileModule } from './village-profile/village-profile.module';
import { AppComponent } from './app.component';
import { ODKService } from './shared/odk.service';
import { PagerService } from './shared/pager.service';
import {ServiceProvisionModule} from './service-provision/service-provision.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   /* MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,*/
    SharedModule,
    AppRoutingModule,
    VillageProfileModule,
    ServiceProvisionModule,
    MatCardModule
  ],
  providers: [ ODKService, PagerService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ToolbarComponent]
})
export class AppModule { }
