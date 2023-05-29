import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {VelibStatsDataModule} from "./velib-stats-data/velib-stats-data.module";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'velib-station-fields',
        data: { pageTitle: 'velibstatsApp.velibStationFields.home.title' },
        loadChildren: () => import('./velib-data-realtime-api/velib-data-realtime-api.module').then(m => m.VelibDataRealtimeApiModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
    VelibStatsDataModule
  ],
})
export class EntityRoutingModule {}
