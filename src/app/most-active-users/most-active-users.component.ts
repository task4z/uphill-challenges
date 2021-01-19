import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitDataService } from '../services/gitdata.service';
import { SimpleUserItem } from '../models/simple-user-item.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-most-active-users',
  templateUrl: './most-active-users.component.html',
  styleUrls: ['./most-active-users.component.scss']
})
export class MostActiveUsersComponent implements OnInit, OnDestroy {

  public activeResponse: SimpleUserItem[];

  constructor(private service: GitDataService,
              private route: ActivatedRoute) {
    this.refresh();
  }

  private onDestroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public refresh(): void{
    this.service.getSearch().pipe(takeUntil(this.onDestroy$)).subscribe(search => this.getActiveUsers(search));
  }

  ngOnInit(): void {
    const searchParam = this.route?.snapshot?.params?.search ? this.route?.snapshot?.params?.search : null;
    this.getActiveUsers(searchParam);
  }

  private getActiveUsers(search?: string): void {
    this.service.getActiveUsers(search).subscribe(
      res => this.activeResponse = res
    );
  }

}
