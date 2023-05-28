import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {VelibStatsDataService} from "../service/velib-stats-data.service";
import {HourlyData, StationData, VelibStatsDataApiResponse} from "../velib-stats-data-api-response.model";

@Component({
  selector: 'jhi-velib-stats-data',
  templateUrl: './velib-stats-data.component.html',
})
export class VelibStatsDataComponent implements OnInit {

  public velibDataApiResponse: VelibStatsDataApiResponse | null = new VelibStatsDataApiResponse();

  constructor(protected velibStatsDataService: VelibStatsDataService) {
  }

  ngOnInit(): void {
    this.velibStatsDataService.getVelibStatData().subscribe((res: HttpResponse<VelibStatsDataApiResponse>) => {
      this.velibDataApiResponse = res.body
    })
  }

  getStations(data: StationData | undefined): string[] {
    if (data) {
      return Object.keys(data);
    }
    return [];
  }

  getHours(data: StationData | undefined): string[] {
    if (data) {
      const firstStation = Object.keys(data)[0];
      return Object.keys(data[firstStation]);
    }
    return [];
  }

  getAvailability(data: HourlyData | undefined, hour: string): number {
    if (data?.[hour]) {
      return data[hour];
    }
    return 0;
  }

  sum(hour: string): number {
    return Number(hour) + 1;
  }
}


