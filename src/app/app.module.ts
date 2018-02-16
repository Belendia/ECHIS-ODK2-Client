import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { VillageProfileModule } from './village-profile/village-profile.module';
import { AppComponent } from './app.component';
import { ODKService } from './shared/odk.service';
import { PagerService } from './shared/pager.service';
import {ServiceProvisionModule} from './service-provision/service-provision.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    AppRoutingModule,
    VillageProfileModule,
    ServiceProvisionModule
  ],
  providers: [ ODKService, PagerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
