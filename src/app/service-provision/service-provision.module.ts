import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatCardModule, MatListModule} from '@angular/material';

import {AncListComponent} from './anc/anc-list.component';
import {ServiceProvisionRouter} from './service-provision.routing';
import {AncDetailComponent} from './anc/anc-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {AncService} from './anc/service/anc.service';
@NgModule({
  declarations:[
    AncListComponent, AncDetailComponent
  ],
  imports: [
    CommonModule,
    //ServiceProvisionRouter,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule
  ],
  exports: [
    AncListComponent, AncDetailComponent
  ],
 providers: [ AncService ],
 /* entryComponents: [ ConfirmDialogComponent ]*/
})
export class ServiceProvisionModule {}
