import { Component, OnInit } from '@angular/core';
import {PeopleService} from "./services/people.service";
import {PeopleViewModel} from "./data/models/people.view-model";
import {Store} from "@ngrx/store";
import {StepperState} from "../../store/reducers/stepper.reducer";
import {savePeople} from "../../store/actions/stepper.actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
})
export class PeopleTableComponent implements OnInit {
  peoples!: PeopleViewModel[];
  selectedValue!:PeopleViewModel;

  constructor(private _peopleService:PeopleService,
              private _store:Store<StepperState>,
              private _router:Router) { }

  ngOnInit(): void {
  this._peopleService.getPeople().then(data=>this.peoples=data);
  }


  showResult():void {
    if(this.selectedValue){
      const peopleModel:PeopleViewModel=this.selectedValue;
      this._store.dispatch(savePeople(peopleModel));
      this._router.navigate(['steps/stepper-result']).finally()
    }
  }


}
