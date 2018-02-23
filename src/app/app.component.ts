import { Component, ComponentFactoryResolver, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { Data, Router, Event, RoutesRecognized } from '@angular/router';

import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @ViewChild("toolbarContainer", {read: ViewContainerRef}) toolbarContainer: ViewContainerRef;
  
  routerEventSubscription: ISubscription;
  fullScreen:boolean = false; 

  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
              private router: Router) {}
  ngOnInit() {
    this.routerEventSubscription = this.router.events.subscribe(
      (event: Event) => {
          if (event instanceof RoutesRecognized) {
              let data = event.state.root.firstChild.data;
              
              let toolbarComponent = ToolbarComponent;
              if(data['toolbar'] !== undefined) {
                toolbarComponent = data['toolbar'];
              } 

              let componentFactory = this.componentFactoryResolver.resolveComponentFactory(toolbarComponent);
              this.toolbarContainer.clear();
              let componentRef = this.toolbarContainer.createComponent(componentFactory);
               
              if(data['title'] !== undefined) {
                componentRef.instance.title = data['title'];
              } 

              this.fullScreen = false;
              if(data['fullScreen'] === true) {
                this.fullScreen = true;
              }
          }
      }
    );
  }
}