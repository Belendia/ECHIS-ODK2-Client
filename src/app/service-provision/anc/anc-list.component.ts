import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ODKService } from '../../shared/odk.service';
import {Subscription} from 'rxjs/Subscription';
import {AncService} from './service/anc.service';
import {Mother} from './model/mother.model';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'anc-list',
  templateUrl: './anc-list.template.html',
  styleUrls: ['./anc-list.style.css']
})
export class AncListComponent implements OnInit, OnDestroy{

  constructor(private ancService: AncService,
              private router: Router, private route: ActivatedRoute,
              private odkService: ODKService,
              private dialog: MatDialog)  {}
  ancClients:any =[];
  ancClientsSubscription: Subscription;
  ngOnInit(): void {
    /*this.ancClients = [
      {
        fname: "Ayelech",
        lname:"Abebe",
        gname:"Chekol",
        age: 24,
        orgUnit: 'Mille',
        LMP: '10/2/2010',
        EDD: '11/11/2010',
        GA: 2,
        alerts: [
          {
            name: 'ANC 4',
            due: '29/4/2010',
            status: 'normal'
          }

        ],
        visits: [
          {
            name: 'Pregnancy Identification',
            date: '8/4/2017'
          }
        ],
        riskFactors: 'Vaginal Bleeding, TB Positive',
        isHighPriority: true,
        isHighRisk: true
      },
      {
        fname: 'Zeritu',
        lname: 'Kebede',
        gname: 'Gebre',
        orgUnit: 'Mille',
        age: 31,
        LMP: '10/1/2010',
        EDD: '11/12/2010',
        GA: 3,
        alerts: [
          {
            name: 'ANC 2',
            due: '24/5/2010',
            status: 'urgent'
          }

        ],
        visits: [
          {
            name: 'ANC 1',
            date: '8/4/2017'
          }
        ],
        riskFactors: '',
        isHighPriority: true,
        isHighRisk: false
      },
      {
        fname: 'Tigist',
        lname: 'Mengistu',
        gname: 'Araya',
        orgUnit: 'Mille',
        age: 29,
        LMP: '10/2/2010',
        EDD: '11/11/2010',
        GA: 2,
        alerts: [
          {
            name: 'ANC 3',
            due: '29/4/2010',
            status: 'urgent'
          }

        ],
        visits: [
          {
            name: 'ANC 2',
            date: '8/4/2017'
          },
          {
            name: 'ANC 1',
            date:  '8/3/2017'  // date ANC 1 was conducted
          }
        ],
        riskFactors: '',
        isHighPriority: true,
        isHighRisk: false
      }



    ];*/

    this.ancClientsSubscription = this.route.data.subscribe((data)=> {
      console.log('anc clients '+ JSON.stringify(data));
      if (data && data.ancClients)
      {
        this.ancClients = data.ancClients.ancClients;
      }
    });

   /* this.ancClientsSubscription = this.ancService.getAncClients().subscribe(
      (result) => {
        this.ancClients = result;
        console.log(JSON.stringify(result));
      },
      (error) => {
        console.log(error);
      }
    );*/

  }

  goToDetail(ancClient:any)
  {
    this.router.navigate(['../anc-detail', ancClient.caseId],
      {relativeTo: this.route, queryParams:{ ga: this.getGestationalAge(ancClient)}});
  }

  onAdd()
  {
    this.odkService.addRowWithSurvey('mother', 'mother', null);
  }


  ngOnDestroy(): void {
    if(this.ancClientsSubscription)
      this.ancClientsSubscription.unsubscribe();
  }


   getGestationalAge (ancClient: Mother) {
    let lmp:any = ancClient.lmp;
     let ga = null;
    try {
      if (lmp) {
        if (typeof(lmp) === 'string')
          lmp = new Date(lmp);

        let today: any = new Date();
        ga = Math.floor((today - lmp) / 1000 / 60 / 60 / 24 / 7);
      }
      if(ga!=null)
        console.log('gestational age in weeks is ' + ga);
    } catch (error) {
      console.log(error);
    }
    return ga;
  }

   isEddPast (edd: any) {
    try
     {
      let eddDate: number = Date.parse(edd);
      let days = (eddDate - new Date().getMilliseconds()) / 1000 / 60 / 60 / 24;
      console.log("edd from now is "+ days + " away or past ");
      if(days < 0)
         return true;
      else
        return false;
     }
    catch(err)
    {
      console.log("getDeliveryRemainingDays "+ err);
      return null;
    }
  }

   getClientRiskFactors(ancClient: any): string
   {
      let riskFactors: string = "";
     if(ancClient && ancClient.riskFactors!=null && ancClient.riskFactors !="")
     {
        return ancClient.riskFactors;
     }
     return riskFactors;
   }

  closeCase(ancClient: any)
  {
    if(ancClient && (ancClient.isClosed ==='N' || ancClient.isClosed ==="N" ))
    {
      this.odkService.editRowWithSurvey('mother', 'anc_close', ancClient.caseId);
    }
  }

  getAncStatus(ancClient: any)
  {
    console.log("ancclient status "+ ancClient.isClosed);
    if( ancClient.isClosed ==='Y' || ancClient.isClosed === "Y")
         return "Inactive";
    else
         return "Active";

  }

  takeFingerPrint(ancClient: any)
  {
    this.odkService.editRowWithSurvey('mother', 'add_fingerprint', ancClient.caseId);
    //this.odkService.addRowWithSurvey('capture_fingerprint', 'capture_fingerprint', null);
  }
}
