import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders, NgModule} from '@angular/core';
import {AncDetailComponent} from './anc/anc-detail.component';
import {AncListComponent} from './anc/anc-list.component';
import {AncDetailResolverService} from './anc/service/anc-detail.resolver.service';
import {AncClientsResolverService} from './anc/service/anc-clients.resolver.service';


const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'anc-list',pathMatch:'full'
  },*/
  { path: 'anc-list',
    component: AncListComponent,
    resolve: { ancClients: AncClientsResolverService}
  },
  {
    path: 'anc-detail/:mother_case_id',
    component: AncDetailComponent,
    resolve: { ancDetail: AncDetailResolverService}
  }

];

export const ServiceProvisionRouter: ModuleWithProviders = RouterModule.forChild(routes);

