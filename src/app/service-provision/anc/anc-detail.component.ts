import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AncService} from './service/anc.service';
import {AncVisitModel} from './model/ancVisit.model';
import {ODKService} from '../../shared/odk.service';
import {DeliveryOutcomeModel} from './model/deliveryOutcome.model';
@Component(
  {
    selector: 'anc-detail',
    templateUrl: 'anc-detail.template.html',
    styleUrls: ['./anc-detail.style.css']
  }
)
export class AncDetailComponent implements OnInit, OnDestroy {
  step = 0;

  mother_case_id: string;
  ancVisits: AncVisitModel[] = [];
  deliveryPlan: any;
  ancVisitsSubscription: Subscription;
  deliveryOutcome: DeliveryOutcomeModel = null;

  constructor(private route: ActivatedRoute, private ancService: AncService, private odkService: ODKService)
  {
  }


  ngOnInit(): void {
    this.ancVisitsSubscription = this.route.data.subscribe((data)=> {
           console.log('anc visits '+ JSON.stringify(data));
            if (data && data.ancDetail)
            {
              this.ancVisits = data.ancDetail.ancVisits;
              this.orderVisitsByVisitNumber();
            }
      });
     this.route.params.subscribe((params: Params) => {
          this.mother_case_id = params['mother_case_id'];
          this.getDeliveryOutcome();
     });


  }

  getDeliveryOutcome()
  {
       this.ancService.getDeliveryOutcome(this.mother_case_id).subscribe(
         (result) => {
           if(result && result!=null)
           {
             console.log("delivery outcome "+ JSON.stringify(result));
              this.deliveryOutcome = result;
           }
         },
         (error) => {
            console.log("couldn't fetch delivery outcome");
         }
       );
  }

 /* getMotherCaseDetail(caseId: string)
  {
    this.ancVisitsSubscription = this.ancService.getAncVisitsByCaseId(caseId).subscribe(
      (result) => {
        this.ancVisits = result;
         this.orderVisitsByVisitNumber();
        console.log(JSON.stringify(result));
      },
      (error) => {
        console.log(error);
      }
    );
  }*/

  orderVisitsByVisitNumber()
  {
      if (this.ancVisits.length > 0) {
           this.ancVisits.sort((a, b) => {
           let _a = a.ancVisitNumber;
           let _b = b.ancVisitNumber;
           return ( _a < _b) ? -1 : (_a > _b)? 1: 0;
         });
      }
  }

  newVisit()
  {
    this.odkService.addRowWithSurvey('anc_visit', 'anc_visit', {anc_case_id: this.mother_case_id,
      last_anc_visit: this.getLastAncVisit(), ga: 8  });
  }

  addDeliveryOutcome()
  {
    this.odkService.addRowWithSurvey('delivery_outcome', 'delivery_outcome', {anc_case_id: this.mother_case_id});
    this.getDeliveryOutcome();
  }

  showInfo(ancVisit: any)
  {

  }

  edit(ancVisit: any)
  {

  }

  getLastAncVisit()
  {
    if(this.ancVisits.length >0)
    {
      let ancVisit: AncVisitModel = this.ancVisits[this.ancVisits.length -1];
       return ancVisit.ancVisitNumber;
    }
    return 0;
  }

  getNextAncNumber(): number
  {
     return this.getLastAncVisit() + 1;
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnDestroy(): void {
    if(this.ancVisitsSubscription)
       this.ancVisitsSubscription.unsubscribe();
  }
}
