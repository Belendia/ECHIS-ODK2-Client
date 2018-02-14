import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { VillageProfileModule } from './village-profile/village-profile.module';
import { AppComponent } from './app.component';
import { ODKService } from './shared/odk.service';
import { PagerService } from './shared/pager.service';

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
    VillageProfileModule
  ],
  providers: [ ODKService, PagerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
