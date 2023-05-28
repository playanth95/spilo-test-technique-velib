import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {VelibStationFieldsComponent} from './list/velib-station-fields.component';
import {VelibStationFieldsRoutingModule} from './route/velib-station-fields-routing.module';
import {VelibStatsDataModule} from "../velib-stats-data/velib-stats-data.module";

@NgModule({
  imports: [SharedModule, VelibStationFieldsRoutingModule, VelibStatsDataModule],
  declarations: [VelibStationFieldsComponent],
  exports: [
    VelibStationFieldsComponent
  ]
})
export class VelibStationFieldsModule {}
