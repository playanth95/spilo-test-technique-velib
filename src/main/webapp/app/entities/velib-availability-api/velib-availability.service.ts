import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from 'app/core/request/request-util';
import {Pagination} from 'app/core/request/request.model';
import {VelibAvailabilityApiResponse} from "./velib-availability.model";

@Injectable({providedIn: 'root'})
export class VelibAvailabilityService {
  private resourceUrl = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=1&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes";

  constructor(private http: HttpClient) {
  }

  query(req?: Pagination): Observable<HttpResponse<VelibAvailabilityApiResponse[]>> {
    const options = createRequestOption(req);
    return this.http.get<VelibAvailabilityApiResponse[]>(this.resourceUrl, {observe: 'response'});
  }

}
