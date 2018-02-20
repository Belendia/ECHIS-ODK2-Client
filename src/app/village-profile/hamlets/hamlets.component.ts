import { Component, OnInit,DoCheck, OnDestroy } from '@angular/core';
import { MatMenuTrigger, PageEvent, MatDialog, MatSnackBar} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Hamlet } from './hamlet.model';
import { HamletsService } from './hamlets.service';
import { PagerService } from '../../shared/pager.service';
import { ODKService } from '../../shared/odk.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Status } from '../../shared/status.enum';

@Component({
  selector: 'app-hamlets',
  templateUrl: './hamlets.component.html',
  styleUrls: ['./hamlets.component.css']
})
export class HamletsComponent implements OnInit,DoCheck, OnDestroy {
  hamlets: Hamlet[] = [];
  display_hamlets: Hamlet[] = [];
  loading: boolean= false;
  message = "";

  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  
  hamletsSubscription: Subscription;
  odkSubscription: Subscription;

  private LOG_TAG: string = "HamletsComponent";
  private SURVEY_IDENTIFIER_CODE: number = 1000;

  constructor(private hamletsService: HamletsService,
              private odkService: ODKService,
              private pagerService: PagerService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private router: Router) {} 

  ngOnInit() {
    //recover data from session variables
    this.recoverState();

    this.hamletsSubscription = this.hamletsService.hamletObservable
      .subscribe((result:{status:Status, hamlets: Hamlet[]}) => {
        if(result.hamlets !== undefined && result.hamlets !== null) {
          switch(result.status) {
            case Status.Loading:
              this.loading= true;
              break;
            case Status.LoadSuccess:
              this.refreshView(result.hamlets);
              break;
            case Status.DeleteSuccess:
              this.refreshView(result.hamlets);
              this.openSnackBar('Hamlet deleted successfully','Dismiss');
              break;
            case Status.DeleteError:
              this.openSnackBar('Unable to delete hamlet','Dismiss');
              break;
          }
        }
        //this.changeDetector.markForCheck();
      }, msg => {
        this.loading=false;
        this.message = msg
        //this.changeDetector.markForCheck();
      });

    //read data from the database
    this.hamletsService.getHamlets();

    this.odkSubscription = this.odkService.surveyResultObservable.subscribe(
      result => this.hamletsService.getHamlets());

    this.odkService.setSurveyIdentifierCode(this.SURVEY_IDENTIFIER_CODE);
  }

  ngDoCheck(): void {}

  ngOnDestroy() {
    if(this.hamletsSubscription) this.hamletsSubscription.unsubscribe();
    if(this.odkSubscription) this.odkSubscription.unsubscribe();
    this.destroyState();
  }

  onAdd() {
    //ToDo: read kebele id from the database
    this.odkService.addRowWithSurvey('hamlet', 'hamlet',{kebele_id:'1'});
  }

  onEdit(hamlet: Hamlet) {
    this.odkService.editRowWithSurvey('hamlet', 'hamlet',hamlet.id);
  }

  onShowHouseholdList(hamlet: Hamlet) {
    this.router.navigate(['/households',hamlet.id] );
  }

  onPageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.display_hamlets = this.pagerService.getPage(
      pageEvent.length, pageEvent.pageIndex, pageEvent.pageSize, this.hamlets);
    this.preserveState();
  }

  onDelete(hamlet: Hamlet): void {
    if(hamlet.number_of_households === 0) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { title:'Confirm Delete' , 
        message: 'Are you sure you want to delete ' + hamlet.name + ' ?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {// if 'Yes' button is clicked, result param will be true
          this.hamletsService.delete(hamlet);
        }
      });
    } else {
      this.openSnackBar('You are not allowed to delete hamlets which have households.','Dismiss');
    }
    
  }

  refreshView(hamlets: Hamlet[]) {
    this.loading = false;
    this.length = hamlets.length;
    this.hamlets = hamlets;
    this.display_hamlets = this.pagerService.getPage(this.length, 0, this.pageSize, this.hamlets);
    if(this.hamlets.length === 0) this.message = "No records found";
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  preserveState() {
    this.odkService.setSessionVariable(this.LOG_TAG, {pageSize:this.pageSize});
  }

  recoverState() {
    let state = this.odkService.getSessionVariable(this.LOG_TAG);

    if(state !== undefined && state !== null && state !== "null") {
        let stateObject = JSON.parse(state);
        this.pageSize = stateObject.pageSize;
    }
  }

  destroyState() {
    this.odkService.setSessionVariable(this.LOG_TAG, null);
  }
}
