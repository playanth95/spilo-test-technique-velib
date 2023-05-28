import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {VelibStatsDataComponent} from "./list/velib-stats-data.component";

@NgModule({
  imports: [SharedModule],
  declarations: [VelibStatsDataComponent],
  exports: [
    VelibStatsDataComponent
  ]
})
export class VelibStatsDataModule {}
