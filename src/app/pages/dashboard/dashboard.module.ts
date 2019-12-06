import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    TranslateModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
