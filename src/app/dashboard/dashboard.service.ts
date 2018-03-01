import { Injectable, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';


import '../odk/odkData.js';
import '../odk/odkCommon.js';

import { Status } from '../shared/status.enum.js';

declare var odkData: any;
declare var odkCommon: any;

@Injectable()
export class DashboardService {
    private LOG_TAG ='DashboardService';

    dashboardObservable = new Subject<{status: Status, data:any[]}>();
    searchTermObservable = new Subject<String>();
  
    constructor(private ngZone: NgZone) { }

    getMembersBySex() {
        this.ngZone.run(() => this.dashboardObservable.next({ status:Status.Loading, data:null }));
    
        let sqlCommand = `SELECT sex, count(sex) AS value FROM hh_member GROUP BY sex`;
    
        odkData.arbitraryQuery('hh_member', sqlCommand, null, null, null, ( result ) => {
                  let data = [];
                  let total = 0;
                  for (let row = 0; row < result.getCount(); row++) {
                    total += Number(result.getData(row, "value"));
                    data.push({
                        id: row,
                        label: result.getData(row,"sex") === 'm' ? 'Male':'Female',
                        value: Number(result.getData(row, "value")),
                        color: result.getData(row,"sex") === 'm' ? 'blue':'pink'
                    });
                  }

                  for(let d of data) {
                    d.value = d.value / total * 100;
                    
                  }

                  this.ngZone.run(() => this.dashboardObservable.next({ status:Status.LoadSuccess, data:data }));
                }, ( errorMsg) => {
                  this.ngZone.run(() => this.dashboardObservable.error("Error: Unable to load members by sex"));
                  console.log(this.LOG_TAG + ": " + errorMsg);
                }
          );
      }
}