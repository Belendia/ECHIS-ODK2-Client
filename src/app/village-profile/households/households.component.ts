import { Component, OnInit,DoCheck, OnDestroy } from '@angular/core';
import { MatMenuTrigger, PageEvent, MatDialog, MatSnackBar, MatSelectChange} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Household } from './household.model';
import { HouseholdsService } from './households.service';
import { PagerService } from '../../shared/pager.service';
import { ODKService } from '../../shared/odk.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Status } from '../../shared/status.enum';
import { Hamlet } from '../hamlets/hamlet.model';
import { HamletsService } from '../hamlets/hamlets.service';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'app-households',
  templateUrl: './households.component.html',
  styleUrls: ['./households.component.css']
})
export class HouseholdsComponent implements OnInit,DoCheck, OnDestroy {
  households: Household[] = [];
  display_households: Household[] = [];
  loading: boolean= false;
  message = "";
  selectedHamletId:string;
  hamlets: Hamlet[] = [];
  searchTerm: String = '';

  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  
  householdsSubscription: Subscription;
  searchTermSubscription: Subscription;
  hamletsSubscription: Subscription;
  odkSubscription: Subscription;

  private LOG_TAG: string = "HouseholdsComponent";
  private SURVEY_IDENTIFIER_CODE: number = 1000;

  constructor(private householdsService: HouseholdsService,
              private hamletsService: HamletsService,
              private odkService: ODKService,
              private pagerService: PagerService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute) {} 

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=> {
        this.selectedHamletId = params['hamlet_id'];
      }
    );

    //recover data from session variables
    this.recoverState();

    this.householdsSubscription = this.householdsService.householdsObservable
      .subscribe((result:{status:Status, households: Household[]}) => {
        this.loading = false;
        if(result.households !== undefined && result.households !== null) {
          switch(result.status) {
            case Status.Loading:
              this.loading= true;
              break;
            case Status.LoadSuccess:
              this.refreshView(result.households);
              break;
            case Status.DeleteSuccess:
              this.refreshView(result.households);
              this.openSnackBar('Household deleted successfully','Dismiss');
              break;
            case Status.DeleteError:
              this.openSnackBar('Unable to delete household','Dismiss');
              break;
          }
        }
      }, msg => {
        this.loading=false;
        this.message = msg
      });

      this.hamletsSubscription = this.hamletsService.hamletObservable
        .subscribe((result:{status:Status, hamlets: Hamlet[]})=> {
          if(result.hamlets !== undefined && result.hamlets !== null) {
            switch(result.status) {
              case Status.LoadSuccess:
                this.hamlets = result.hamlets;
                break;
            }
          }
        });

        this.searchTermSubscription = this.householdsService.searchTermObservable
          .subscribe((searchTerm) => {
            this.searchTerm = searchTerm;
         });
    //get hamlets list from the database
    this.hamletsService.getHamlets();

    // get households list from the database
    this.householdsService.getHouseholds(this.selectedHamletId);

    this.odkSubscription = this.odkService.surveyResultObservable.subscribe(
      result => this.householdsService.getHouseholds(this.selectedHamletId));

    this.odkService.setSurveyIdentifierCode(this.SURVEY_IDENTIFIER_CODE);
    
  }

  ngDoCheck(): void {}

  ngOnDestroy() {
    if(this.householdsSubscription) this.householdsSubscription.unsubscribe();
    if(this.hamletsSubscription) this.hamletsSubscription.unsubscribe();
    if(this.odkSubscription) this.odkSubscription.unsubscribe();
    if(this.searchTermSubscription) this.searchTermSubscription.unsubscribe();
    this.destroyState();
  }

  onAdd() {
    //ToDo: read hamlet id from the database
    this.odkService.addRowWithSurvey('household', 'household',{hamlet_id:this.selectedHamletId});
  }

  onEdit(houashold: Household) {
    this.odkService.editRowWithSurvey('household', 'household',houashold.id);
  }

  onSelectChange(event: MatSelectChange) {
    this.selectedHamletId = event.value;
    this.preserveState();
    this.householdsService.getHouseholds(event.value);
  }

  onPageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.display_households = this.pagerService.getPage(
      pageEvent.length, pageEvent.pageIndex, pageEvent.pageSize, this.households);
    this.preserveState();
  }

  onDelete(household: Household): void {

    if(household.number_of_hh_members === 0) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { title:'Confirm Delete' , 
        message: 'Are you sure you want to delete this household member ?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {// if 'Yes' button is clicked, result param will be true
          this.householdsService.delete(household);
        }
      });
    } else {
      this.openSnackBar('You are not allowed to delete households which have household members.','Dismiss');
    }
  }

  refreshView(households: Household[]) {
    this.loading = false;
    this.length = households.length;
    this.households = households;
    this.display_households = this.pagerService.getPage(this.length, 0, this.pageSize, this.households);
    if(this.households.length === 0) this.message = "No records found";
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  preserveState() {
    this.odkService.setSessionVariable(this.LOG_TAG, 
      {
        pageSize:this.pageSize, 
        selectedHamletId:this.selectedHamletId
      });
  }

  recoverState() {
    let state = this.odkService.getSessionVariable(this.LOG_TAG);
    if(state !== undefined && state !== null && state !== "null") {
        let stateObject = JSON.parse(state);
        this.pageSize = stateObject.pageSize;
        this.selectedHamletId = stateObject.selectedHamletId;
    }
  }

  destroyState() {
    this.odkService.setSessionVariable(this.LOG_TAG, null);
  }
}