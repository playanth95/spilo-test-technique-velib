// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { Observable, of, EMPTY } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';
//
// import { IVelibStationFields } from '../velib-station-fields.model';
// import { VelibStatsDataService } from '../service/velib-station-fields.service';
//
// @Injectable({ providedIn: 'root' })
// export class VelibStationFieldsRoutingResolveService implements Resolve<IVelibStationFields | null> {
//   constructor(protected service: VelibStatsDataService, protected router: Router) {}
//
//   resolve(route: ActivatedRouteSnapshot): Observable<IVelibStationFields | null | never> {
//     const id = route.params['id'];
//     if (id) {
//       return this.service.find(id).pipe(
//         mergeMap((velibStationFields: HttpResponse<IVelibStationFields>) => {
//           if (velibStationFields.body) {
//             return of(velibStationFields.body);
//           } else {
//             this.router.navigate(['404']);
//             return EMPTY;
//           }
//         })
//       );
//     }
//     return of(null);
//   }
// }
