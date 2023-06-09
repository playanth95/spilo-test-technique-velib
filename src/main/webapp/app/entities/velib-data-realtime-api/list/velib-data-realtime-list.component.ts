import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, ParamMap, Router} from '@angular/router';
import {combineLatest, interval, Observable, switchMap, tap} from 'rxjs';

import {ITEMS_PER_PAGE, PAGE_HEADER} from 'app/config/pagination.constants';
import {ASC_OPEN_DATA, DEFAULT_SORT_DATA, SORT} from 'app/config/navigation.constants';
import {EntityResponseType, VelibDataRealtimeApiService} from '../service/velib-data-realtime-api.service';
import {Record, VelibAvailabilityApiResponse} from "../../velib-availability-api/velib-availability.model";

@Component({
  selector: 'jhi-velib-station-fields',
  templateUrl: './velib-data-realtime-list.component.html',
})
export class VelibDataRealtimeListComponent implements OnInit {
  records?: Record[];
  isLoading = false;

  predicate = 'dist';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  constructor(
    protected velibStationFieldsService: VelibDataRealtimeApiService,
    protected activatedRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  trackId = (_index: number, item: Record): number => this.velibStationFieldsService.getVelibStationFieldsIdentifier(item);

  ngOnInit(): void {
    console.log("j init le componsant");
    this.load();
    // Refresh every minute (60,000 milliseconds)
    interval(60000).subscribe(() => {
      this.load();
    });
  }

  load(): void {
    this.loadFromOpenApiWithRouteInformations().subscribe({
      next: (res: EntityResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending);
  }

  setClasses(alert: number | undefined): { [key: string]: boolean } {
    const classes = {'badge': Boolean(true)};
    if (alert === 0) {
      return {...classes, [' bg-danger']: true};
    } else {
      return {...classes, [' bg-success']: true};
    }
  }

  protected loadFromOpenApiWithRouteInformations(): Observable<EntityResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryOpenApi(this.page, this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    if(data[DEFAULT_SORT_DATA]) {
      const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC_OPEN_DATA;
    }
  }

  protected onResponseSuccess(response: EntityResponseType): void {
    if (response.body && response.body.nhits) {
      this.fillComponentAttributesFromResponseHeader(response.body.nhits);
      this.records = this.fillComponentAttributesFromResponseBody(response.body);
    }
  }

  protected fillComponentAttributesFromResponseBody(data: VelibAvailabilityApiResponse | null): Record[] {
    return data?.records ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(totalHits: number): void {
    this.totalItems = totalHits;
  }

  protected queryOpenApi(page?: number, predicate?: string, ascending?: boolean): Observable<EntityResponseType> {
    this.isLoading = true;
    let pageToLoad: number = page ?? 1;
    pageToLoad = pageToLoad === 0 || pageToLoad === -1 ? 0 : (pageToLoad - 1) * ITEMS_PER_PAGE
    const queryObject = {
      start: pageToLoad,
      rows: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.velibStationFieldsService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC_OPEN_DATA : '';
    predicate = predicate === 'id' ? 'dist' : predicate;
    if (predicate === '') {
      return [];
    } else {
      return [ascendingQueryParam + predicate];
    }
  }


}
