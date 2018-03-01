import { Injectable, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';


import '../../../odk/odkData.js';
import '../../../odk/odkCommon.js';
import { Status } from '../../../shared/status.enum.js';
import { Member } from './member.model.js';

declare var odkData: any;
declare var odkCommon: any;

@Injectable()
export class MembersService {
  private members: Member[];
  private LOG_TAG ='MembersService';
  
  membersObservable = new Subject<{status: Status, members:Member[]}>();
  searchTermObservable = new Subject<String>();
  
  constructor(private ngZone: NgZone) { }

  getMembers(householdId?: string) {
    this.ngZone.run(() => this.membersObservable.next({ status:Status.Loading, members:[] }));
    let sqlBindParams = [ householdId ];

    let sqlCommand = `SELECT * FROM hh_member WHERE hh_member.household_id = ? GROUP BY first_name`;

    odkData.arbitraryQuery('hh_member', sqlCommand, sqlBindParams, null, null, ( result ) => {
              this.members = [];
              
              for (let row = 0; row < result.getCount(); row++) {
                this.members.push( new Member(result.getData(row,"_id"),
                  result.getData(row, "household_id"),
                  result.getData(row,"first_name"),
                  result.getData(row,"middle_name"),
                  result.getData(row, "last_name"),
                  result.getData(row,"sex"),
                  result.getData(row, "date_of_birth"),
                  result.getData(row,"vital_registration_number"),
                  result.getData(row, "tin_number"),
                  result.getData(row,"occupation"),
                  result.getData(row,"educational_status"),
                  result.getData(row,"marital_status"),
                  result.getData(row,"phone"),
                  result.getData(row, "email"),
                  result.getData(row, "current_status"),
                  (result.getData(0,"photo_uriFragment") ? '../../data/tables/hh_member/instances/'+result.getData(row,"_id").replace(/:|-/g,'_')+'/'+result.getData(row,"photo_uriFragment") : null)));
              }

              this.ngZone.run(() => this.membersObservable.next({ status:Status.LoadSuccess, members:this.members }));
            }, ( errorMsg) => {
              this.ngZone.run(() => this.membersObservable.error("Error: Unable to load household members"));
              console.log(this.LOG_TAG + ": " + errorMsg);
            }
      );
  }

  delete(member: Member) {
    const index = this.members.indexOf(member);
    if(index> -1) {
      odkData.deleteRow('hh_member', {'_id':member.id}, member.id, ()=>{
        this.members.splice(index, 1);
        this.ngZone.run(() => this.membersObservable.next({ status:Status.DeleteSuccess, members:this.members }));
      }, ()=>{
        this.ngZone.run(() => this.membersObservable.next({ status: Status.DeleteError, members:this.members }));
      });
      
    }
  }
}
