import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import {AncListComponent} from './service-provision/anc/anc-list.component';
import {AncDetailComponent} from './service-provision/anc/anc-detail.component';


const appRoutes: Routes = [
    { path:'', redirectTo:'/dashboard', pathMatch:'full' },
  //phone
    {path:'default/config/assets',redirectTo:'/dashboard', pathMatch:'full'},
    {path:'default/config/assets/index.html',redirectTo:'/dashboard', pathMatch:'full'},
    {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}}
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
