import { Component, OnInit,DoCheck, OnDestroy, Input } from '@angular/core';
import { MatMenuTrigger, PageEvent, MatDialog, MatSnackBar, MatSelectChange} from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ODKService } from '../../../shared/odk.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { Member } from './member.model';
import { Status } from '../../../shared/status.enum';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit,DoCheck, OnDestroy {
  private LOG_TAG: string = "MembersComponent";
  private SURVEY_IDENTIFIER_CODE: number = 1003;

  @Input() householdId: string;

  members: Member[] = [];
  loading: boolean= false;
  message = "";
  photo: string = "./assets/images/person.svg"
  

  membersSubscription: Subscription;
  odkSubscription: Subscription;

  constructor(private membersService: MembersService,
              private odkService: ODKService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {} 

  ngOnInit() {
    console.log(this.LOG_TAG, this.householdId);
    //recover data from session variables
    this.recoverState();

    this.membersSubscription = this.membersService.membersObservable
      .subscribe((result:{status:Status, members: Member[]}) => {
        if(result.members !== undefined && result.members !== null) {
          switch(result.status) {
            case Status.Loading:
              this.loading= true;
              break;
            case Status.LoadSuccess:
              this.refreshView(result.members);
              break;
            case Status.DeleteSuccess:
              this.refreshView(result.members);
              this.openSnackBar('Household member deleted successfully','Dismiss');
              break;
            case Status.DeleteError:
              this.openSnackBar('Unable to delete household member','Dismiss');
              break;
          }
        }
      }, msg => {
        this.loading=false;
        this.message = msg
      });

    // get household members list from the database
    this.membersService.getMembers(this.householdId);

    this.odkSubscription = this.odkService.surveyResultObservable.subscribe(
      result => this.membersService.getMembers(this.householdId));

    this.odkService.setSurveyIdentifierCode(this.SURVEY_IDENTIFIER_CODE);
  }

  ngDoCheck(): void {}

  ngOnDestroy() {
    if(this.membersSubscription) this.membersSubscription.unsubscribe();
    if(this.odkSubscription) this.odkSubscription.unsubscribe();
    this.destroyState();
  }

  onEdit(member: Member) {
    this.odkService.editRowWithSurvey('hh_member', 'hh_member',member.id);
  }

  onDelete(member: Member): void {

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { title:'Confirm Delete' , 
        message: 'Are you sure you want to delete this household member ?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {// if 'Yes' button is clicked, result param will be true
          this.membersService.delete(member);
        }
      });
  }

  refreshView(members: Member[]) {
    this.loading = false;
    this.members = members;
    if(this.members.length === 0) this.message = "No records found";
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  preserveState() {
    this.odkService.setSessionVariable(this.LOG_TAG, 
      {
        householdId:this.householdId
      });
  }

  recoverState() {
    let state = this.odkService.getSessionVariable(this.LOG_TAG);
    if(state !== undefined && state !== null && state !== "null") {
        let stateObject = JSON.parse(state);
        this.householdId = stateObject.householdId;
    }
  }

  destroyState() {
    this.odkService.setSessionVariable(this.LOG_TAG, null);
  }
}