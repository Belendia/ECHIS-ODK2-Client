import { Component, OnInit, OnDestroy } from '@angular/core';

import { ODKService } from '../../../shared/odk.service';

@Component({
  selector: 'app-households-toolbar',
  templateUrl: './households-toolbar.component.html',
  styleUrls: ['./households-toolbar.component.css']
})
export class HouseholdsToolbarComponent implements OnInit, OnDestroy {
  searchTerm: string;
  showSearch:boolean = false;
  title = 'Households';
  private LOG_TAG: string = 'HouseholdsToolbarComponent';

  constructor(private odkService: ODKService) { }
  
  ngOnInit() {
    this.recoverState();
  }

  ngOnDestroy(): void {
    this.destroyState();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if(this.showSearch === false) this.searchTerm = '';
    this.preserveState();
  }

  onSearchChange(value) {
    this.preserveState();
  }

  preserveState() {
    this.odkService.setSessionVariable(this.LOG_TAG, 
      {
        showSearch: this.showSearch, 
        searchTerm: this.searchTerm
      });
  }

  recoverState() {
    let state = this.odkService.getSessionVariable(this.LOG_TAG);
    if(state !== undefined && state !== null && state !== "null") {
        let stateObject = JSON.parse(state);
        this.showSearch = stateObject.showSearch;
        this.searchTerm = stateObject.searchTerm
    }
  }

  destroyState() {
    this.odkService.setSessionVariable(this.LOG_TAG, null);
  }
}