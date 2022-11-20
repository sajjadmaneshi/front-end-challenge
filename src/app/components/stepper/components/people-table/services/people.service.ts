import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PeopleViewModel} from "../data/models/people.view-model";
import {firstValueFrom} from "rxjs";



@Injectable()
export class PeopleService{
  constructor(private _http:HttpClient) {
  }

  getPeople(){
    return firstValueFrom( this._http.get<any>('assets/db.json'))
      .then(res=><PeopleViewModel[]>res.people)
      .then(people=>{return people})
  }
}
