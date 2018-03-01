import { Injectable, NgZone } from '@angular/core';

import '../../../odk/odkData.js';
import {Mother} from '../model/mother.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {AncVisitModel} from '../model/ancVisit.model';
import {Status} from '../../../shared/status.enum';
import {Hamlet} from '../../../village-profile/hamlets/hamlet.model';
import {DeliveryOutcomeModel} from '../model/deliveryOutcome.model';

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
               console.log("mother row data :"+ JSON.stringify(result));
               let mother: Mother = new Mother();
               mother.caseId = result.getData(rowId, "_id");
               mother.householdMemberId = result.getData(rowId, "hhmember_id");
               mother.registrationDate = result.getData(rowId, "registration_date");
               mother.registrationLocation = result.getData(rowId, "registration_place");
               mother.lmp = result.getData(rowId, "lmp");
               mother.edd = result.getData(rowId, "edd");
               mother.previousComplications = result.getData(rowId, "previous_complications");
               mother.riskFactors = result.getData(rowId, "general_medical_history");
               mother.isClosed = result.getData(rowId, "isClosed");
               mother.reason_for_closing_anc = result.getData(rowId, "reason_for_closing_anc");
               console.log("previous_complications "+ result.getData(rowId, "previous_complications"));
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
               visit.visitPlace = result.getData(rowId, "visit_location");
               visit.gestationalAge = result.getData(rowId, "ga");
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

  getDeliveryOutcome(motherCaseId: string): Observable<DeliveryOutcomeModel>
  {
    let deliveryOutcomeSubject: Subject<DeliveryOutcomeModel> = new Subject<DeliveryOutcomeModel>();
    odkData.query('delivery_outcome', null, null,
      null, null, null, null, null, null, null, (result) => {
          let deliveryOutcome: DeliveryOutcomeModel = null;
        for (let rowId = 0; rowId < result.getCount(); rowId++) {
          if (result.getData(rowId, "anc_case_id") === motherCaseId) {
            deliveryOutcome = new DeliveryOutcomeModel();
            deliveryOutcome.anc_case_id = result.getData(rowId, "anc_case_id");
            deliveryOutcome.delivery_date = result.getData(rowId, "delivery_date");
            deliveryOutcome.delivery_place = result.getData(rowId, "delivery_place");
            deliveryOutcome.type_of_delivery = result.getData(rowId, "type_of_delivery");
            deliveryOutcome.delivery_outcome = result.getData(rowId, "delivery_outcome");
            deliveryOutcome.delivery_complications = result.getData(rowId, "delivery_complications");
            deliveryOutcome.child_sex = result.getData(rowId, "child_sex");
            deliveryOutcome.child_birth_weight = result.getData(rowId, "child_birth_weight");
            console.log(this.LOG_TAG + ": delivery outcome: " + JSON.stringify(deliveryOutcome));
            break;
          }
        }
        deliveryOutcomeSubject.next(deliveryOutcome);
      },
      (error) => {
        console.log(this.LOG_TAG + ":"+ error);
        deliveryOutcomeSubject.error("Error: Unable to load delivery outcome");
      }
    );
    return deliveryOutcomeSubject.asObservable();
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
