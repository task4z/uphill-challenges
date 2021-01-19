import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitDataService } from '../services/gitdata.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SimpleUserDetail } from '../models/simple-user-detail.model';
import { SimpleRepositoryItem } from '../models/simple-repository-item.model';

@Component({
  selector: 'app-user-deatil-page',
  templateUrl: './user-deatil-page.component.html',
  styleUrls: ['./user-deatil-page.component.scss']
})
export class UserDeatilPageComponent implements OnInit, OnDestroy {

  public login: string;
  private onDestroy$: Subject<void> = new Subject();
  public userDetail: SimpleUserDetail;
  public repositoryUser: SimpleRepositoryItem[];

  constructor(private service: GitDataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.login = this.route.snapshot.params.login;
    this.getData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private getData(): void {
    this.getUserInfo();
    this.getRepositoryInfo();
  }

  private getUserInfo(): void {
    this.service.getUser(this.login).pipe(takeUntil(this.onDestroy$)).subscribe(res => this.userDetail = res);
  }

  private getRepositoryInfo(): void {
    this.service.getRepositoriesFromUser(this.login).pipe(takeUntil(this.onDestroy$)).subscribe(res => this.repositoryUser = res);
  }
}
