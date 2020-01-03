import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule, TabsModule} from "ngx-bootstrap";
import {OnlyNumber} from "../../directives/OnlyNumbersDirective";
import { ScanComponentMentionComponent } from './scan-component-mention/scan-component-mention.component';
import {AlertmessagesComponent} from "./alertmessages/alertmessages.component";
import { PrisePhotoComponentComponent } from './prise-photo-component/prise-photo-component.component';

@NgModule({
  declarations: [ OnlyNumber, ScanComponentMentionComponent
      , AlertmessagesComponent, PrisePhotoComponentComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  exports: [
     OnlyNumber,  
     ScanComponentMentionComponent, AlertmessagesComponent, PrisePhotoComponentComponent,
  ],
})
export class GRCComponentsModule { }
