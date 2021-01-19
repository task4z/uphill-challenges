import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitDataService } from '../services/gitdata.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';
import { empty, Subject } from 'rxjs';
import { noop } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy{

  public searchField: FormControl = new FormControl();

  constructor(
    private router: Router,
    private service: GitDataService) {
      this.detectChange();
  }

  private onDestroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private detectChange(): void {
    this.searchField.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.search(searchTerm);
        if(this.router.url.includes('/user')){
          this.goHome(searchTerm);
        }
        return empty();
      }))
      .subscribe();
  }

  public search(searchTerm: string): void {
    this.service.search(searchTerm);
  }

  public goHome(searchTerm?: string): void {
    if (searchTerm){
      this.router.navigate(['/', searchTerm]);
    }
    this.router.navigate(['/']);
  }

}
