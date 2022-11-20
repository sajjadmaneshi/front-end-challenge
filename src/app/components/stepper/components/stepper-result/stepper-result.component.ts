import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {StepperState} from "../../store/reducers/stepper.reducer";
import {firstValueFrom, Observable} from "rxjs";
import {selectSteppers} from "../../store/selector/stepper.selectors";

@Component({
  selector: 'app-stepper-result',
  templateUrl: './stepper-result.component.html',
})

export class StepperResultComponent implements OnInit {

  finalResult$!:Observable<StepperState>;
  finalResult!:StepperState;

  constructor(private _store:Store<StepperState>) { }

  ngOnInit(): void {
    this.executeData().finally();
  }

  private async executeData(){
    this.finalResult$=this._store.pipe(select(selectSteppers));
    this.finalResult=await firstValueFrom(this.finalResult$);
  }

}
