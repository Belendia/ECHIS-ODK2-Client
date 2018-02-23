import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatCardModule, MatListModule, MatMenuModule} from '@angular/material';

import {AncListComponent} from './anc/anc-list.component';
import {ServiceProvisionRouter} from './service-provision.routing';
import {AncDetailComponent} from './anc/anc-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {AncService} from './anc/service/anc.service';
import {SharedModule} from '../shared/shared.module';
import {AncDetailResolverService} from './anc/service/anc-detail.resolver.service';
import {AncClientsResolverService} from './anc/service/anc-clients.resolver.service';


@NgModule({
  declarations:[
    AncListComponent, AncDetailComponent
  ],
  imports: [
    CommonModule,
    ServiceProvisionRouter,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatMenuModule,
    SharedModule
  ],
  exports: [
    AncListComponent, AncDetailComponent
  ],
 providers: [ AncService, AncDetailResolverService, AncClientsResolverService ],
 /* entryComponents: [ ConfirmDialogComponent ]*/
})
export class ServiceProvisionModule {}
