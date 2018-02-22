import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HamletsComponent } from "./hamlets/hamlets.component";
import { HouseholdsComponent } from "./households/households.component";
import { HouseholdsToolbarComponent } from "./households/households-toolbar/households-toolbar.component";
import { HouseholdComponent } from "./households/household/household.component";

//I added this for lazy loading

const villageProfileRoutes : Routes = [
    { path: 'hamlets', component: HamletsComponent , data:{title: 'Hamlets'}},
    { path: 'households', component: HouseholdsComponent, data:{toolbar: HouseholdsToolbarComponent} },
    { path: 'households/:hamlet_id', component: HouseholdsComponent, data:{toolbar: HouseholdsToolbarComponent} },
    { path: 'household/:household_id', component: HouseholdComponent, data:{fullScreen: true} }
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