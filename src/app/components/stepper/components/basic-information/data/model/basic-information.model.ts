import {StatusModel} from "./status.model";

export interface BasicInformationModel{
  amount:number,
  date:Date,
  status:StatusModel,
  source:string
}
