import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { GitDataService } from '../services/gitdata.service';
import { SimpleUserItem } from '../models/simple-user-item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trending-users',
  templateUrl: './trending-users.component.html',
  styleUrls: ['./trending-users.component.scss']
})
export class TrendingUsersComponent implements OnInit, OnDestroy {

  public trendResponse: SimpleUserItem[];

  constructor(private service: GitDataService,
              private route: ActivatedRoute) {
    this.refresh();
  }

  private onDestroy$: Subject<void> = new Subject();

  ngOnDestroy(): void{
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public refresh(): void {
    this.service.getSearch().pipe(takeUntil(this.onDestroy$)).subscribe(search => this.getTrendingUsers(search));
  }

  ngOnInit(): void {
    let searchParam = null;
    if (this.route && this.route.snapshot && this.route.snapshot.params && this.route.snapshot.params.search){
      searchParam = this.route.snapshot.params.search;
    }
    this.getTrendingUsers(searchParam);
  }

  private getTrendingUsers(search?: string): void {
    this.service.getTrendingUsers(search).pipe(takeUntil(this.onDestroy$)).subscribe(
      res => this.trendResponse = res
    );
  }
}
