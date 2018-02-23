import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

import { ODKService } from '../../../shared/odk.service';
import { Household } from '../household.model';
import { HouseholdService } from './household.service';
import { ISubscription } from 'rxjs/Subscription';
import { Status } from '../../../shared/status.enum';

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent implements OnInit {
  private LOG_TAG: string = "HouseholdComponent";

  @ViewChild('tab') tab: ElementRef;
  icon='edit';
  selectedTabIndex = 0;
  loading: boolean= false;
  message: string = '';
  householdId: string;
  household: Household;
  householdSubscription: ISubscription;
  photo: string = "./assets/images/house.svg"
  
  constructor(private route: ActivatedRoute,
              private odkService: ODKService,
              private householdService: HouseholdService) { }

  ngOnInit() {
    this.recoverState();
    this.householdSubscription = this.householdService.householdObservable
      .subscribe((result:{status:Status, household: Household})=>{
      this.message = "";
      switch(result.status) {
        case Status.Loading:
          this.loading= true;
          break;
        case Status.LoadSuccess:
          this.loading = false;
          if(result.household.photo) {
            this.photo = result.household.photo;
          }
          this.household = result.household;
          break;
      }
    }, msg => {
      this.loading=false;
      this.message = msg
    });

    this.route.params.subscribe(
      (params: Params)=> {
        this.householdId = params['household_id'];
        this.message = "";
        this.householdService.getHousehold(this.householdId);
      }
    );
  }

  ngOnDestroy() {
    if(this.householdSubscription) this.householdSubscription.unsubscribe();
    this.destroyState();
  }

  onActionButtonClicked() {
    switch(this.selectedTabIndex) {
      case 0:
        this.odkService.editRowWithSurvey('household', 'household',this.household.id);
        break;
      case 1:
        this.odkService.addRowWithSurvey('hh_member','hh_member',{household_id: this.household.id});
        break;
    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.selectedTabIndex = tabChangeEvent.index;
    switch(tabChangeEvent.index) {
      case 0:
        this.icon="edit";
        break;
      case 1:
        this.icon="add";
        break;
    }
    this.preserveState();
  }

  preserveState() {
    this.odkService.setSessionVariable(this.LOG_TAG, 
      {
        icon: this.icon,
        selectedTabIndex: this.selectedTabIndex
      });
  }
  
  recoverState() {
    let state = this.odkService.getSessionVariable(this.LOG_TAG);
    if(state !== undefined && state !== null && state !== "null") {
        let stateObject = JSON.parse(state);
        this.icon = stateObject.icon;
        this.selectedTabIndex = stateObject.selectedTabIndex;
    }
  }
  
  destroyState() {
    this.odkService.setSessionVariable(this.LOG_TAG, null);
  }
  
}

