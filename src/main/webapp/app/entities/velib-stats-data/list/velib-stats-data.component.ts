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
      this.getTopThreeStation(this.velibDataApiResponse?.stationNameHourAverageBikeAvailable);
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

  getTopThreeStation(data: StationData | undefined): any[] {
    const stationTopThreeMap = new Map<string, number>;
    if (data) {
      for (const station of this.getStations(data)) {
        let sumBikeAvaibableTotal = 0
        for (const hour of this.getHours(data)) {
          sumBikeAvaibableTotal = sumBikeAvaibableTotal + Math.round(this.getAvailability(data[station], hour));
        }
        stationTopThreeMap.set(station, Math.round(sumBikeAvaibableTotal / this.getHours(data).length));

      }
    }
    return this.sortAndSliceMap(stationTopThreeMap, 3);
  }

  /**
   * Return, un Array trié par valeur croissante
   * @param map, map qu'on souhaite trié et transformé en Array
   * @param count, nombre d'élément à retirer de l'Array.
   */
  sortAndSliceMap(map: Map<string, number>, count: number): any[] {
    const sortedArray = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    return sortedArray.slice(0, count);
  }

}


