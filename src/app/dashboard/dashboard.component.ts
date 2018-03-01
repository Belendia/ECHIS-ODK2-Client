import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ISubscription } from 'rxjs/Subscription';
import { Status } from '../shared/status.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ DashboardService ]
})
export class DashboardComponent implements OnInit, DoCheck, OnDestroy {
  loadingMembersBySex: boolean= false;
  membersBySexMessage = '';
  membersBySex = [];
  dashboardSubscription: ISubscription;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardSubscription = this.dashboardService.dashboardObservable
      .subscribe((result:{status:Status, data: any[]}) => {
        this.membersBySexMessage = "";
        if(result.data !== undefined && result.data !== null) {
          switch(result.status) {
            case Status.Loading:
              this.loadingMembersBySex= true;
              break;
            case Status.LoadSuccess:
              this.loadingMembersBySex = false;
              this.membersBySex = result.data;
              if(this.membersBySex.length === 0) this.membersBySexMessage = "No records found";
              break;
            }
          }
        }, msg => {
          this.loadingMembersBySex=false;
          this.membersBySexMessage = msg
        });

      this.dashboardService.getMembersBySex();
  }

  ngDoCheck(): void {}

  ngOnDestroy() {
    if(this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
  }
}
