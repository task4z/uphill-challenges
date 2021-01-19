import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { GitDataService } from '../services/gitdata.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RepositoryUser } from '../models/repository-user.model';
import { SimpleUserItem } from '../models/simple-user-item.model';
import { SimpleUserDetail } from '../models/simple-user-detail.model';
import { SimpleRepositoryItem } from '../models/simple-repository-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnChanges, OnDestroy {

  @Input() public user: SimpleUserItem;
  public cardBG: string;
  public smallBackground: string;
  public hover = false;
  public userDetail: SimpleUserDetail;
  public repositoryUser: SimpleRepositoryItem[];

  constructor(private service: GitDataService,
              private router: Router) { }

  private onDestroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnChanges(): void {
    this.getInfos();
  }

  private getInfos(): void {
    if (this.user && this.user.login) {
      this.getUserInfo();
      this.getRepositoryInfo();
      this.leaveCard();
    }
  }
  private getUserInfo(): void {
    this.service.getUser(this.user.login).pipe(takeUntil(this.onDestroy$)).subscribe(res => this.userDetail = res);
  }

  private getRepositoryInfo(): void {
    this.service.getRepositoriesFromUser(this.user.login).pipe(takeUntil(this.onDestroy$)).subscribe(res => this.repositoryUser = res);
  }

  public leaveCard(): void {
    this.hover = false;
    this.smallBackground = `linear-gradient(rgba(46, 58, 83, 0.5), rgba(46, 58, 83, 0.5)),url('${this.user.avatar_url}')`;
    this.cardBG = 'none';
  }

  public enterCard(): void {
    this.hover = true;
    this.cardBG = `linear-gradient(rgba(46, 58, 83, 0.5), rgba(46, 58, 83, 0.5)),url('${this.user.avatar_url}')`;
    this.smallBackground = 'none';
  }

  public openProfile(): void {
    this.router.navigate(['/user', this.user.login]);
  }
}
