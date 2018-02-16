import {Component, OnInit} from '@angular/core';
@Component(
  {
    selector: 'anc-detail',
    templateUrl: 'anc-detail.template.html',
    styleUrls: ['./anc-detail.style.css']
  }
)
export class AncDetailComponent implements OnInit {
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


  ngOnInit(): void {
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
}
