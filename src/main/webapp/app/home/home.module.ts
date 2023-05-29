import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from 'app/shared/shared.module';
import {HOME_ROUTE} from './home.route';
import {HomeComponent} from './home.component';
import {VelibStationFieldsModule} from "../entities/velib-data-realtime-api/velib-station-fields.module";
import {VelibStatsDataModule} from "../entities/velib-stats-data/velib-stats-data.module";

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), VelibStationFieldsModule, VelibStatsDataModule],
  declarations: [HomeComponent],
})
export class HomeModule {
}
