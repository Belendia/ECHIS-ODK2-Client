import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatCardModule, MatDialogModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSidenavModule,
  MatSnackBarModule, MatToolbarModule
} from '@angular/material';

import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {FormatDatePipe} from './pipes/formatDate.pipe';
import {FilterPipe} from './pipe/filter.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    declarations:[
        ConfirmDialogComponent,
        MessageDialogComponent,
        ToolbarComponent,
        FormatDatePipe,
        FilterPipe
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatChipsModule,
        MatTabsModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatSnackBarModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule
         ],
    exports: [
        CommonModule,
        ConfirmDialogComponent,
        MessageDialogComponent,
        MatDialogModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatChipsModule,
        MatTabsModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatSnackBarModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        ToolbarComponent,
        MatToolbarModule,
        MatSidenavModule,
        FormatDatePipe,
        FilterPipe
    ]
})
export class SharedModule{}
