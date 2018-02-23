import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material";

import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {FormatDatePipe} from './pipes/formatDate.pipe';

@NgModule({
    declarations:[
        ConfirmDialogComponent,
        MessageDialogComponent,
        ToolbarComponent,
        FormatDatePipe
    ],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        ConfirmDialogComponent,
        MessageDialogComponent,
        ToolbarComponent,
        FormatDatePipe
    ]
})
export class SharedModule{}
