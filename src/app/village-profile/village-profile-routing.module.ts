import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HamletsComponent } from "./hamlets/hamlets.component";
import { HouseholdsComponent } from "./households/households.component";
import { HouseholdsToolbarComponent } from "./households/households-toolbar/households-toolbar.component";

//I added this for lazy loading

const villageProfileRoutes : Routes = [
    { path: 'hamlets', component: HamletsComponent },
    { path: 'households', component: HouseholdsComponent, data:{toolbar: HouseholdsToolbarComponent} },
    { path: 'households/:hamlet_id', component: HouseholdsComponent, data:{toolbar: HouseholdsToolbarComponent} }
];

@NgModule({
    imports: [
        RouterModule.forChild(villageProfileRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class VillageProfileRoutingModule{}