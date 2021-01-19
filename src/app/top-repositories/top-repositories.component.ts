import { Component, OnInit, OnDestroy } from '@angular/core';
import { GitDataService } from '../services/gitdata.service';
import { SimpleRepositoryItem } from '../models/simple-repository-item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-repositories',
  templateUrl: './top-repositories.component.html',
  styleUrls: ['./top-repositories.component.scss']
})
export class TopRepositoriesComponent implements OnInit, OnDestroy {

  public repositories: SimpleRepositoryItem[];

  constructor(private service: GitDataService,
              private route: ActivatedRoute) {
    this.refresh();
  }

  private onDestroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public refresh(): void {
    this.service.getSearch().pipe(takeUntil(this.onDestroy$)).subscribe(search => this.getRepos(search));
  }

  ngOnInit(): void {
    const searchParam = this.route?.snapshot?.params?.search ? this.route?.snapshot?.params?.search : null;
    this.getRepos(searchParam);
  }

  public getRepos(search?: string): void {
    this.service.getTopRepositories(search).pipe(takeUntil(this.onDestroy$)).subscribe(
      res => this.repositories = res
    );
  }

}
