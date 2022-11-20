import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss']
})
export class SteperComponent implements OnInit {
  stepItems: MenuItem[];

  subscription=new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.stepItems=[{

    }]
  }

  private _initializeStepperItems(){
    this.stepItems=[{
      label:'upload Image'
    },
      {
        label:'information'
      },
      {
        label:'people'
      },
      {label:'result'}]
  }

}
