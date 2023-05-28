import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationConfigService} from 'app/core/config/application-config.service';
import {VelibStatsDataApiResponse} from "../velib-stats-data-api-response.model";


export type EntityResponseType = HttpResponse<VelibStatsDataApiResponse>;

@Injectable({providedIn: 'root'})
export class VelibStatsDataService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/velib-stats/process');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {
  }

  getVelibStatData(): Observable<EntityResponseType> {
    return this.http.get<VelibStatsDataApiResponse>(this.resourceUrl, {observe: 'response'});
  }


}
