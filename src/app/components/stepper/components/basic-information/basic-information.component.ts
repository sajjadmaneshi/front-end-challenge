import {Component, OnInit} from '@angular/core';
import {StatusModel} from "./data/model/status.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {StepperState} from "../../store/reducers/stepper.reducer";
import {selectSteppers} from "../../store/selector/stepper.selectors";
import {Observable} from "rxjs";
import {BasicInformationModel} from "./data/model/basic-information.model";
import {saveBasicInfo} from "../../store/actions/stepper.actions";

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {
  statuses!: StatusModel[];
  minDate!: Date;
  maxDate!: Date;
  today = new Date();
  submitted: boolean = false;
  basicInformationForm!: FormGroup;

  public get amount(): FormControl {
    return this.basicInformationForm.get('amount') as FormControl;
  }

  public get date(): FormControl {
    return this.basicInformationForm.get('date') as FormControl;
  }

  public get status(): FormControl {
    return this.basicInformationForm.get('status') as FormControl;
  }

  public get source(): FormControl {
    return this.basicInformationForm.get('source') as FormControl;
  }

  constructor(private _router: Router, private _store: Store<StepperState>) {
  }

  ngOnInit(): void {
    this._initForm();
    this._initializeStatusOptions();
    this._calculateMinAndMaxCalendarDate();
  }

  private _initForm() {
    this.basicInformationForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      date: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required)
    })
  }

  private _initializeStatusOptions(): void {
    this.statuses = [
      {title: 'bad', value: 'bad'},
      {title: 'middle', value: 'middle'},
      {title: 'good', value: 'good'},
      {title: 'perfect', value: 'perfect'}
    ]
  }

  private _calculateMinAndMaxCalendarDate() {
    let today = new Date();
    let nextDay = today.getDate() + 1;
    this.minDate = new Date();
    this.minDate.setDate(nextDay);
    this.maxDate = new Date();
    this.maxDate.setDate(today.getDate() + 5);
  }

  submitForm() {
    this.submitted = true;
    if (this.basicInformationForm.valid) {
      const basicInformation: BasicInformationModel = {
        amount: this.amount.value,
        date: this.date.value,
        source: this.source.value,
        status: this.status.value
      }
      this._store.dispatch(saveBasicInfo(basicInformation));
      this._router.navigate(['steps/people-table']).finally()
    }
  }
}
