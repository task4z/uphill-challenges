import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrendingUsersComponent } from './trending-users.component';
import { of, Subscription } from 'rxjs';
import { GitDataService } from '../services/gitdata.service';
import { SimpleUserItem } from '../models/simple-user-item.model';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from '@angular/router';

const trendingUsersMock = [{
  login: 'manuel',
  avatar_url: 'avatar_do_manuel'} as SimpleUserItem];

describe('TrendingUsersComponent', () => {
  let component: TrendingUsersComponent;
  let fixture: ComponentFixture<TrendingUsersComponent>;
  let gitDataService: GitDataService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingUsersComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              get: () => {search: null},
            },
          },
        },
      },
      GitDataService]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
    gitDataService = fixture.debugElement.injector.get(GitDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const service: GitDataService = TestBed.inject(GitDataService);
    expect(service).toBeTruthy();
    expect(activatedRoute.snapshot.params.search).toEqual(undefined);
  });

  it('should update the users', () => {
    const spyGetTrendingUsers = spyOn(gitDataService, 'getTrendingUsers').and.returnValue(of(trendingUsersMock));
    component.ngOnInit();

    fixture.detectChanges();
    expect(component.trendResponse).toEqual(trendingUsersMock);
    expect(spyGetTrendingUsers.calls.any()).toEqual(true);
  });

  it('should update the users after search', () => {
    const spyGetTrendingUsers = spyOn(gitDataService, 'getTrendingUsers').and.returnValue(of(trendingUsersMock));
    const spyGetSearch = spyOn(gitDataService, 'getSearch').and.returnValue(of('trendingUsersMock'));
    component.refresh();

    fixture.detectChanges();
    expect(component.trendResponse).toEqual(trendingUsersMock);
    expect(spyGetSearch.calls.any()).toEqual(true);
    expect(spyGetSearch.calls.argsFor(0)).toEqual([]);
    expect(spyGetTrendingUsers.calls.any()).toEqual(true);
  });

  it('should update the users with search parameter',() =>{
    activatedRoute.snapshot.params.search = 'manuel';
    fixture = TestBed.createComponent(TrendingUsersComponent);
    component = fixture.debugElement.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();

    const spyGetTrendingUsers = spyOn(gitDataService, 'getTrendingUsers').and.returnValue(of(trendingUsersMock));
    component.ngOnInit();
    expect(activatedRoute.snapshot.params.search).toEqual('manuel');
    expect(spyGetTrendingUsers.calls.any()).toEqual(true);
    expect(spyGetTrendingUsers.calls.argsFor(0)).toEqual(['manuel']);
    expect(component.trendResponse).toEqual(trendingUsersMock);
  })
});