import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HamletsComponent } from "./village-profile/hamlets/hamlets.component";


const appRoutes: Routes = [
    { path:'', redirectTo:'/hamlets', pathMatch:'full' },
    //phone
    {path:'default/config/assets',redirectTo:'/hamlets', pathMatch:'full'},
    { path: 'hamlets', component: HamletsComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}