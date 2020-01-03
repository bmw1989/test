import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AdministrationService } from './administration/administration.service';
import {CustomFormsModule} from "ng2-validation";
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    CustomFormsModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers:[
    AdministrationService,
  ],
})
export class PagesModule {
}
