import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StepperComponent} from "./stepper.component";
import {Routing} from "./routing";
import {ImageUploaderComponent} from "./components/image-uploader/image-uploader.component";
import {BasicInformationComponent} from "./components/basic-information/basic-information.component";
import {PeopleTableComponent} from "./components/people-table/people-table.component";
import {StepperResultComponent} from "./components/stepper-result/stepper-result.component";


const routes: Routes = [
  {
    path: '',
    component: StepperComponent,
    children:[
      {path:'',redirectTo:Routing.uploadImage,pathMatch:"full"},
      {path:Routing.uploadImage,component:ImageUploaderComponent},
      {path:Routing.basicInformation,component:BasicInformationComponent},
      {path:Routing.peopleTable,component:PeopleTableComponent},
      {path:Routing.stepperResult,component:StepperResultComponent},
    ]
  },
];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class StepperRoutingModule { }
