import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VelibStationFieldsComponent} from '../list/velib-station-fields.component';
import {ASC} from 'app/config/navigation.constants';

const velibStationFieldsRoute: Routes = [
  {
    path: '',
    component: VelibStationFieldsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
  },

];
@NgModule({
  imports: [RouterModule.forChild(velibStationFieldsRoute)],
  exports: [RouterModule],
})
export class VelibStationFieldsRoutingModule {}
