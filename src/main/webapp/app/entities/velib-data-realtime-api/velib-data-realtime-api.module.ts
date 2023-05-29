import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {VelibDataRealtimeListComponent} from './list/velib-data-realtime-list.component';
import {VelibStatsDataModule} from "../velib-stats-data/velib-stats-data.module";

@NgModule({
  imports: [SharedModule, VelibStatsDataModule],
  declarations: [VelibDataRealtimeListComponent],
  exports: [
    VelibDataRealtimeListComponent
  ]
})
export class VelibDataRealtimeApiModule {}
