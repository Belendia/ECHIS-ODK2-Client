import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HamletsComponent } from "./village-profile/hamlets/hamlets.component";
import { HouseholdsComponent } from "./village-profile/households/households.component";
import {AncListComponent} from './service-provision/anc/anc-list.component';
import {AncDetailComponent} from './service-provision/anc/anc-detail.component';


const appRoutes: Routes = [
    { path:'', redirectTo:'/hamlets', pathMatch:'full' },
    //phone
    {path:'default/config/assets',redirectTo:'/hamlets', pathMatch:'full'},
    {path:'default/config/assets/index.html',redirectTo:'/hamlets', pathMatch:'full'},
    { path: 'hamlets', component: HamletsComponent },
    { path: 'households', component: HouseholdsComponent },
    { path: 'households/:hamlet_id', component: HouseholdsComponent },
    { path: 'anc', component: AncListComponent},
    { path: 'anc-detail', component: AncDetailComponent}
  /*{path: 'anc', loadChildren: './service-provision/service-provision.module#ServiceProvisionModule'}*/
];

@NgModule({
    imports: [
        //RouterModule.forRoot(appRoutes)
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
