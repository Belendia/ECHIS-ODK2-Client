import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'anc-list',
  templateUrl: './anc-list.template.html'
})
export class AncListComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute)  {}
  ancClients:any =[];
  ngOnInit(): void {
    this.ancClients = [
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



    ];
  }

  goToDetail(ancClient:any)
  {
    this.router.navigate(['../anc-detail'], {relativeTo: this.route});
  }
}
