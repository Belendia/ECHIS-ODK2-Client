import { Injectable, NgZone } from '@angular/core';

import '../../../odk/odkData.js';
import {Mother} from '../model/mother.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {AncVisitModel} from '../model/ancVisit.model';

declare var odkData: any;
const mockhhmData: any[] = [
  {
    householdMemberId: "a1",
    name: "Ayelech Abebe Chekol",
    age: 21,
    orgUnit: "Mille"
  },
  {
    householdMemberId: "a2",
    name: "Zeritu Kebede Gebre",
    age: 24,
    orgUnit: "Mille"
  },
  {
    householdMemberId: "a3",
    name: "Tigist Mengistu Araya",
    age: 25,
    orgUnit: "Chencha"
  }
];
@Injectable()
export class AncService {

  private LOG_TAG = 'AncService';


  getAncClients(): Observable<Mother[]>  {

       let ancClientSubjects: Subject<Mother[]> = new Subject<Mother[]>();
        odkData.query('mother', null, null,
      null, null, null, null, null, null, null, (result) => {
           let ancClients: Mother[] = [];
             for (let rowId = 0; rowId < result.getCount(); rowId++) {
               let mother: Mother = new Mother();
               mother.caseId = result.getData(rowId, "_id");
               mother.householdMemberId = result.getData(rowId, "hhmember_id");
               mother.registrationDate = result.getData(rowId, "registration_date");
               mother.registrationLocation = result.getData(rowId, "registration_place");
               mother.lmp = result.getData(rowId, "lmp");
               mother.edd = result.getData(rowId, "edd");
               this.fillMotherOtherInfo(mother);
               console.log(this.LOG_TAG + ": mother data: "+ JSON.stringify(mother));
                 ancClients.push(mother);
             }
             ancClientSubjects.next(ancClients);

        },
        (error) => {
          console.log(this.LOG_TAG + ":"+ error);
          ancClientSubjects.error("Error: Unable to load anc clients");
        }
        );
       return ancClientSubjects.asObservable();
  }

  getAncVisitsByCaseId(motherCaseId: string): Observable<AncVisitModel[]>
  {
    let ancVisitsSubjects: Subject<AncVisitModel[]> = new Subject<AncVisitModel[]>();
    odkData.query('anc_visit', null, null,
      null, null, null, null, null, null, null, (result) => {
        let ancVisits: AncVisitModel[] = [];
        for (let rowId = 0; rowId < result.getCount(); rowId++) {
             if (result.getData(rowId, "anc_case_id") === motherCaseId) {
               let visit: AncVisitModel = new AncVisitModel();
               visit.ancCaseId = result.getData(rowId, "anc_case_id");
               visit.dateOfVisit = result.getData(rowId, "date_of_visit");
               visit.ancVisitNumber = result.getData(rowId, "anc_visit_number");
               visit.visitPlace = result.getData(rowId, "visit_place");
               visit.gestationalAge = result.getData(rowId, "gestational_age");
               console.log(this.LOG_TAG + ": anc visit data: " + JSON.stringify(visit));
               ancVisits.push(visit);
             }
        }
        ancVisitsSubjects.next(ancVisits);

      },
      (error) => {
        console.log(this.LOG_TAG + ":"+ error);
        ancVisitsSubjects.error("Error: Unable to load anc visits");
      }
    );
    return ancVisitsSubjects.asObservable();
  }

  fillMotherOtherInfo(mother: any)
  {
      var furtherInfo = mockhhmData.filter((hhm)=> {
         return hhm.householdMemberId === mother.householdMemberId;
      });

      if(furtherInfo.length > 0)
      {
        let tmp = furtherInfo[0];
         mother.name = tmp.name;
         mother.age = tmp.age;
         mother.orgUnit = tmp.orgUnit;
      }

  }

  }
