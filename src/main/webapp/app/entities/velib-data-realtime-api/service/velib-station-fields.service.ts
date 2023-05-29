import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationConfigService} from 'app/core/config/application-config.service';
import {createRequestOption} from 'app/core/request/request-util';
import {Pagination} from "../../../core/request/request.model";
import {Record, VelibAvailabilityApiResponse} from "../../velib-availability-api/velib-availability.model";


export type EntityResponseType = HttpResponse<VelibAvailabilityApiResponse>;

@Injectable({providedIn: 'root'})
export class VelibStationFieldsService {
  private resourceUrl = "https://opendata.paris.fr/api/records/1.0/search/" +
    "?dataset=velib-disponibilite-en-temps-reel&q=&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=paris&geofilter.distance=48.8709807,2.3353503,1000";

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {
  }


  query(req?: Pagination): Observable<HttpResponse<VelibAvailabilityApiResponse>> {
    const options = createRequestOption(req);
    return this.http.get<VelibAvailabilityApiResponse>(this.resourceUrl, {params: options, observe: 'response'});
  }

  getVelibStationFieldsIdentifier(velibStationFields: Record): number {
    return Number(velibStationFields.recordid);
  }


}
