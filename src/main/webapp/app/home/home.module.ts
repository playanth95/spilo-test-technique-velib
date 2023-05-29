import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from 'app/shared/shared.module';
import {HOME_ROUTE} from './home.route';
import {HomeComponent} from './home.component';
import {VelibDataRealtimeApiModule} from "../entities/velib-data-realtime-api/velib-data-realtime-api.module";
import {VelibStatsDataModule} from "../entities/velib-stats-data/velib-stats-data.module";

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), VelibDataRealtimeApiModule, VelibStatsDataModule],
  declarations: [HomeComponent],
})
export class HomeModule {
}
