import { NgModule } from "@angular/core";
import {AncListComponent} from './anc/anc-list.component';
import {ServiceProvisionRouter} from './service-provision.routing';
import {AncDetailComponent} from './anc/anc-detail.component';
import {AncService} from './anc/service/anc.service';
import {SharedModule} from '../shared/shared.module';
import {AncDetailResolverService} from './anc/service/anc-detail.resolver.service';
import {AncClientsResolverService} from './anc/service/anc-clients.resolver.service';


@NgModule({
  declarations:[
    AncListComponent, AncDetailComponent
  ],
  imports: [
    ServiceProvisionRouter,
    SharedModule
  ],
 providers: [ AncService, AncDetailResolverService, AncClientsResolverService ]
})
export class ServiceProvisionModule {}
