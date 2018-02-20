import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders, NgModule} from '@angular/core';
import {AncDetailComponent} from './anc/anc-detail.component';
import {AncListComponent} from './anc/anc-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'anc-list',pathMatch:'full'
  },
  { path: 'anc-list',
    component: AncListComponent
  },
  {
    path: 'anc-detail/:mother_case_id',
    component: AncDetailComponent
  }

];

export const ServiceProvisionRouter: ModuleWithProviders = RouterModule.forChild(routes);

