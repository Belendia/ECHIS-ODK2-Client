import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material";

import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@NgModule({
    declarations:[
        ConfirmDialogComponent,
        MessageDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        ConfirmDialogComponent,
        MessageDialogComponent
    ]
})
export class SharedModule{}