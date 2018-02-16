import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material";

import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    declarations:[
        ConfirmDialogComponent,
        MessageDialogComponent,
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        ConfirmDialogComponent,
        MessageDialogComponent,
        ToolbarComponent
    ]
})
export class SharedModule{}