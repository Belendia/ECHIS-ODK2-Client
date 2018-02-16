import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule, MatListModule, MatButtonModule, MatMenuModule, 
         MatPaginatorModule, MatCardModule, MatProgressSpinnerModule, MatGridListModule, 
         MatSnackBarModule, MatSelectModule, MatOptionModule, MatInputModule } from '@angular/material';
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { HamletsComponent } from "./hamlets/hamlets.component";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { HouseholdsComponent } from "./households/households.component";
import { HamletsService } from "./hamlets/hamlets.service";
import { HouseholdsService } from "./households/households.service";
import { HouseholdsToolbarComponent } from "./households/households-toolbar/households-toolbar.component";
import { VillageProfileRoutingModule } from "./village-profile-routing.module";

@NgModule({
    declarations:[
        HamletsComponent,
        HouseholdsComponent,
        HouseholdsToolbarComponent
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
        FormsModule,
        SharedModule,
        VillageProfileRoutingModule
    ],
    exports: [
        HamletsComponent,
        HouseholdsComponent,
        MatListModule,
    ],
    providers: [ HamletsService, HouseholdsService ],
    entryComponents: [ ConfirmDialogComponent, HouseholdsToolbarComponent ]
})
export class VillageProfileModule{}