export class StationData {
  [stationName: string]: HourlyData;
}

export class HourlyData {
  [hour: string]: number;
}

export class VelibStatsDataApiResponse {
  stationNameHourAverageBikeAvailable?: StationData;
  stationNameHourAverageFreeDockAvailable?: StationData;
}

