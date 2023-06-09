import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {VelibDataRealtimeApiService} from '../service/velib-data-realtime-api.service';

import {VelibDataRealtimeListComponent} from './velib-data-realtime-list.component';
import SpyInstance = jest.SpyInstance;
import {VelibAvailabilityApiResponse} from "../../velib-availability-api/velib-availability.model";

describe('VelibStationFields Management Component', () => {
  let comp: VelibDataRealtimeListComponent;
  let fixture: ComponentFixture<VelibDataRealtimeListComponent>;
  let service: VelibDataRealtimeApiService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: 'velib-station-fields', component: VelibDataRealtimeListComponent}]),
        HttpClientTestingModule,
      ],
      declarations: [VelibDataRealtimeListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: '-dist',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'dist',
              })
            ),
            snapshot: {queryParams: {}},
          },
        },
      ],
    })
      .overrideTemplate(VelibDataRealtimeListComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VelibDataRealtimeListComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VelibDataRealtimeApiService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse<VelibAvailabilityApiResponse>({
          body: {
            nhits: 0,
            parameters: undefined,
            records: [],
            facet_groups: []
          },
          headers
        })
      )
    )
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
  });

  describe('trackId', () => {
    it('Should forward to velibStationFieldsService', () => {
      const entity = {recordid: "123"};
      jest.spyOn(service, 'getVelibStationFieldsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVelibStationFieldsIdentifier).toHaveBeenCalledWith(entity);
      expect(String(id)).toBe(entity.recordid);
    });
  });

  it('should load a page', () => {
    // WHEN
    comp.navigateToPage(1);

    // THEN
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({sort: ['dist']}));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // GIVEN
    comp.predicate = 'dist';

    // WHEN
    comp.navigateToWithComponentValues();

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['-dist'],
        }),
      })
    );
  });
});
