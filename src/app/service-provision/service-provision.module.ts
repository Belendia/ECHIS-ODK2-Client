import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatCardModule, MatListModule} from '@angular/material';

import {AncListComponent} from './anc/anc-list.component';
import {ServiceProvisionRouter} from './service-provision.routing';
import {AncDetailComponent} from './anc/anc-detail.component';

@NgModule({
  declarations:[
    AncListComponent, AncDetailComponent
  ],
  imports: [
    CommonModule,
    ServiceProvisionRouter,
    MatListModule,
    MatCardModule
  ],
  exports: [
    AncListComponent, AncDetailComponent
  ],
/*  providers: [ HamletsService, HouseholdsService ],*/
 /* entryComponents: [ ConfirmDialogComponent ]*/
})
export class ServiceProvisionModule {}
