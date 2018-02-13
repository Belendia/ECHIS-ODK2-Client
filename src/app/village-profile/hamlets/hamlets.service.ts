import { Injectable, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Hamlet } from './hamlet.model';
import { environment } from '../../../environments/environment';
import { Status } from '../../shared/status.enum';

import '../../odk/odkData.js';

declare var odkData: any;

@Injectable()
export class HamletsService {

  private hamlets: Hamlet[];
  private LOG_TAG ='HamletsService';
  
  hamletObservable = new Subject<{status: Status,hamlets:Hamlet[]}>();
  
  constructor(private ngZone: NgZone) {}

  getHamlets() {
    this.ngZone.run(() => this.hamletObservable.next({ status:Status.Loading, hamlets:[] }));
    odkData.arbitraryQuery('hamlet', 
      `SELECT hamlet._id, hamlet.name,hamlet.current_status, hamlet.kebele_id, count(household._id) AS "number_of_households" 
       FROM hamlet LEFT JOIN household ON hamlet._id = household.hamlet_id GROUP BY hamlet._id`, 
        null, null, null, ( result ) => {
          this.hamlets = [];
          
          for (let row = 0; row < result.getCount(); row++) {
            this.hamlets.push( new Hamlet(result.getData(row,"_id"),
              result.getData(row, "name"),
              Number(result.getData(row,"current_status")),
              Number(result.getData(row,"number_of_households")),
              result.getData(row,"kebele_id")) );
          }

          //this.hamletObservable.next(this.hamlets.slice());
          this.ngZone.run(() => this.hamletObservable.next({ status:Status.LoadSuccess, hamlets:this.hamlets.slice() }));
        }, ( errorMsg) => {
          //this.hamletObservable.error("Error: Unable to load hamlets")
          this.ngZone.run(() => this.hamletObservable.error("Error: Unable to load hamlets"));
          console.log(this.LOG_TAG + ": " + errorMsg);
        }
    );
  }

  delete(hamlet: Hamlet) {
    const index = this.hamlets.indexOf(hamlet);
    if(index> -1) {
      odkData.deleteRow('hamlet', {'_id':hamlet.id}, hamlet.id, ()=>{
        this.hamlets.splice(index, 1);
        this.ngZone.run(() => this.hamletObservable.next({ status:Status.DeleteSuccess, hamlets:this.hamlets.slice() }));
      }, ()=>{
        this.ngZone.run(() => this.hamletObservable.next({ status: Status.DeleteError, hamlets:this.hamlets }));
      });
    }
  }
}