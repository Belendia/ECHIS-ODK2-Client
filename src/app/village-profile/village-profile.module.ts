import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule, MatListModule, MatButtonModule, MatMenuModule, 
         MatPaginatorModule, MatCardModule, MatProgressSpinnerModule, MatGridListModule, 
         MatSnackBarModule, MatSelectModule, MatOptionModule, MatInputModule, MatTabsModule } from '@angular/material';
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { HamletsComponent } from "./hamlets/hamlets.component";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { HouseholdsComponent } from "./households/households.component";
import { HamletsService } from "./hamlets/hamlets.service";
import { HouseholdsService } from "./households/households.service";
import { HouseholdsToolbarComponent } from "./households/households-toolbar/households-toolbar.component";
import { VillageProfileRoutingModule } from "./village-profile-routing.module";
import { HouseholdComponent } from "./households/household/household.component";
import { HouseholdService } from "./households/household/household.service";
import { MembersComponent } from "./households/members/members.component";
import { MembersService } from "./households/members/members.service";

@NgModule({
    declarations:[
        HamletsComponent,
        HouseholdsComponent,
        HouseholdsToolbarComponent,
        HouseholdComponent,
        MembersComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule, 
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatMenuModule,
        MatPaginatorModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatSnackBarModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatTabsModule,
        FormsModule,
        SharedModule,
        VillageProfileRoutingModule
    ],
    exports: [
        HamletsComponent,
        HouseholdsComponent,
        HouseholdComponent,
        MembersComponent,
        MatListModule
    ],
    providers: [ HamletsService, HouseholdsService, HouseholdService, MembersService ],
    entryComponents: [ ConfirmDialogComponent, HouseholdsToolbarComponent ]
})
export class VillageProfileModule{}