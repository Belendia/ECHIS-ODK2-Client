import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AncService} from './service/anc.service';
import {AncVisitModel} from './model/ancVisit.model';
@Component(
  {
    selector: 'anc-detail',
    templateUrl: 'anc-detail.template.html',
    styleUrls: ['./anc-detail.style.css']
  }
)
export class AncDetailComponent implements OnInit, OnDestroy {
  step = 0;
  visits: any[] = [
    {
      name: 'ANC 2',
      date: '8/4/2017'
    },
    {
      name: 'ANC 1',
      date:  '8/3/2017'  // date ANC 1 was conducted
    }
    ];

  alerts: any[] = [
    {
      name: 'ANC 3',
      due: '29/4/2018',
      status: 'urgent'
    }

    ];

  mother_case_id: string;
  ancVisits: AncVisitModel[] = [];
  deliveryPlan: any;
  ancVisitsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private ancService: AncService)
  {

  }


  ngOnInit(): void {
    //get the hhm_id from route and query the odk table , anc_visit
     this.route.params.subscribe((params: Params) => {
          this.mother_case_id = params['mother_case_id'];
          this.getMotherCaseDetail(this.mother_case_id);
     });
  }

  getMotherCaseDetail(caseId: string)
  {
    this.ancVisitsSubscription = this.ancService.getAncVisitsByCaseId(caseId).subscribe(
      (result) => {
        this.ancVisits = result;
        console.log(JSON.stringify(result));
      },
      (error) => {
        console.log(error);
      }
    );
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
  newVisit()
  {

  }

  showInfo(ancVisit: any)
  {

  }

  edit(ancVisit: any)
  {

  }


  ngOnDestroy(): void {
    if(this.ancVisitsSubscription)
       this.ancVisitsSubscription.unsubscribe();
  }
}
