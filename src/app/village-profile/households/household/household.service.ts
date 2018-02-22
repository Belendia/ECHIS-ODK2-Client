import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Household } from '../household.model.js';
import '../../../odk/odkData.js';
import '../../../odk/odkCommon.js';
import { Status } from '../../../shared/status.enum.js';

declare var odkData: any;
declare var odkCommon: any;

@Injectable()
export class HouseholdService {
  private household: Household;
  private LOG_TAG ='HouseholdService';
  
  householdObservable = new Subject<{status: Status, household: Household}>();
  
  constructor(private ngZone: NgZone) { }

  getHousehold(householdId?: string) {
  this.ngZone.run(() => this.householdObservable.next({ status:Status.Loading,household: this.household}));
    let sqlBindParams = [ householdId ];

    let sqlCommand = `SELECT household.*, hamlet.name AS hamlet_name FROM household INNER JOIN hamlet 
                  ON household.hamlet_id = hamlet._id WHERE household._id = ?`;

    odkData.arbitraryQuery('household', sqlCommand, sqlBindParams, null, null, ( result ) => {
              if (result !== null && result !== undefined && result.getCount()>0) {
                this.household= new Household(result.getData(0,"_id"),
                  result.getData(0, "hamlet_id"),
                  result.getData(0,"registration_date"),
                  result.getData(0,"household_number"),
                  result.getData(0, "head_name"),
                  result.getData(0,"phone"),
                  //odkCommon.getRowFileAsUrl('household',row,result.getData(row,"photo_uriFragment")),
                  (result.getData(0,"photo_uriFragment") ? '../../data/tables/household/instances/'+result.getData(0,"_id").replace(/:|-/g,'_')+'/'+result.getData(0,"photo_uriFragment") : null),
                  Number(result.getData(0, "current_status")),
                  null,
                  result.getData(0,"hamlet_name"));
              }
              this.ngZone.run(() => this.householdObservable.next({ status:Status.LoadSuccess,household:this.household} ));
            }, ( errorMsg) => {
              this.ngZone.run(() => this.householdObservable.error("Error: Unable to load household"));
              console.log(this.LOG_TAG + ": " + errorMsg);
            }
      );
  }
}
