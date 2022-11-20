import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {StepperState} from "../../store/reducers/stepper.reducer";
import {saveImage} from "../../store/actions/stepper.actions";
import {UploadImageModel} from "./data/upload-image.model";
import {ImageService} from "./services/image.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  providers:[ImageService]
})
export class ImageUploaderComponent  {

  uploadedFileBase64!:string|null;

  constructor(private _router:Router,
              private store:Store<StepperState>,
              private _imageService:ImageService) { }

  onUpload(event:any):void {
    for(let file of event.files) {
      this._imageService.convertFile(file).
      pipe(filter(convertedValue=>convertedValue!=null)).
      subscribe(convertedValue=>{
        this.uploadedFileBase64=convertedValue;
      })

    }
  }

  nextPage():void {
    if(this.uploadedFileBase64){
      const uploadImageModel:UploadImageModel={
        picture:this.uploadedFileBase64
      }
      this.store.dispatch(saveImage(uploadImageModel))
      this._router.navigate(['steps/basic-information']).finally()
    }
  }

  onRemove():void {
  this.uploadedFileBase64=null;
  }
}
