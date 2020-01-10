import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule, TabsModule} from "ngx-bootstrap";
import {OnlyNumber} from "../../directives/OnlyNumbersDirective";
import { ScanComponentMentionComponent } from './scan-component-mention/scan-component-mention.component';
import {AlertmessagesComponent} from "./alertmessages/alertmessages.component";
import { PrisePhotoComponentComponent } from './prise-photo-component/prise-photo-component.component';
import {TranslateModule} from "@ngx-translate/core";
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule} from "@nebular/theme";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  declarations: [
    OnlyNumber,
    ScanComponentMentionComponent,
    AlertmessagesComponent,
    PrisePhotoComponentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    TranslateModule,
    ModalModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbButtonModule,
    LeafletModule.forRoot(),
  ],
  exports: [
    OnlyNumber,
    ScanComponentMentionComponent,
    AlertmessagesComponent,
    PrisePhotoComponentComponent,
  ],
})
export class GRCComponentsModule { }
