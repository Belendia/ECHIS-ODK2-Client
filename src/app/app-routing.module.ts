import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HamletsComponent } from "./village-profile/hamlets/hamlets.component";
import { HouseholdsComponent } from "./village-profile/households/households.component";


const appRoutes: Routes = [
    { path:'', redirectTo:'/hamlets', pathMatch:'full' },
    //phone
    {path:'default/config/assets',redirectTo:'/hamlets', pathMatch:'full'},
    {path:'default/config/assets/index.html',redirectTo:'/hamlets', pathMatch:'full'},
    { path: 'hamlets', component: HamletsComponent },
    { path: 'households', component: HouseholdsComponent },
    { path: 'households/:hamlet_id', component: HouseholdsComponent }
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