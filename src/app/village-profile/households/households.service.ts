import { Injectable, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Household } from './household.model';
import { environment } from '../../../environments/environment';
import { Status } from '../../shared/status.enum';

import '../../odk/odkData.js';
import '../../odk/odkCommon.js';

declare var odkData: any;
declare var odkCommon: any;

@Injectable()
export class HouseholdsService {
  private households: Household[];
  private LOG_TAG ='HouseholdsService';
  
  householdsObservable = new Subject<{status: Status, households:Household[]}>();
  
  constructor(private ngZone: NgZone) { }

  getHouseholds(hamletId?: string) {
    this.ngZone.run(() => this.householdsObservable.next({ status:Status.Loading, households:[] }));
    let sqlParam = '';
    let sqlBindParams = null;
    
    if(hamletId !== undefined) {
      sqlParam = ' WHERE household.hamlet_id = ?'
      sqlBindParams = [ hamletId ];
    }

    let sqlCommand = `SELECT household.*, count(hh_member._id) AS "number_of_hh_member" FROM household LEFT JOIN hh_member 
                  ON household._id = hh_member.household_id ${sqlParam} GROUP BY household._id`;

    odkData.arbitraryQuery('household', sqlCommand, sqlBindParams, null, null, ( result ) => {
              this.households = [];
              
              for (let row = 0; row < result.getCount(); row++) {
                console.log(result.getData(row,"photo"));
                this.households.push( new Household(result.getData(row,"_id"),
                  result.getData(row, "hamlet_id"),
                  result.getData(row,"registration_date"),
                  result.getData(row,"household_number"),
                  result.getData(row,"phone"),
                  //odkCommon.getRowFileAsUrl('household',row,result.getData(row,"photo_uriFragment")),
                  '../../data/tables/household/instances/'+result.getData(row,"_id").replace(/:|-/g,'_')+'/'+result.getData(row,"photo_uriFragment"),
                  Number(result.getData(row, "current_status")),
                  Number(result.getData(row,"number_of_hh_member"))));
              }

              this.ngZone.run(() => this.householdsObservable.next({ status:Status.LoadSuccess, households:this.households.slice() }));
            }, ( errorMsg) => {
              this.ngZone.run(() => this.householdsObservable.error("Error: Unable to load households"));
              console.log(this.LOG_TAG + ": " + errorMsg);
            }
      );
  }

  delete(household: Household) {
    const index = this.households.indexOf(household);
    if(index> -1) {
      odkData.deleteRow('household', {'_id':household.id}, household.id, ()=>{
        this.households.splice(index, 1);
        this.ngZone.run(() => this.householdsObservable.next({ status:Status.DeleteSuccess, households:this.households.slice() }));
      }, ()=>{
        this.ngZone.run(() => this.householdsObservable.next({ status: Status.DeleteError, households:this.households }));
      });
      
    }
  }
}
