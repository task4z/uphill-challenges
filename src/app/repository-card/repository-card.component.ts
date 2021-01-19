import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SimpleRepositoryItem } from '../models/simple-repository-item.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent implements OnInit, OnDestroy {

  @Input() public repository: SimpleRepositoryItem;
  @Input() public index: number;
  public btColor: string;

  constructor() { }

  private onDestroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.calcColor();
  }

  public calcColor(): void {
    const color: string = this.lightenDarkenColor('#1D42A2',50 - (this.index*10));
    this.btColor = `5px solid ${color}`;
  }

  /**Credits to: https://css-tricks.com/snippets/javascript/lighten-darken-color/ */
  lightenDarkenColor(col: string, amt: number) {
    const value=amt
    amt=256-Math.floor(amt*5.12)
    const  usePound = col[0]=="#";
    if (usePound)
        col = col.slice(1);

    const num = parseInt(col,16);

    const rr=(num >> 16) + amt;
    const  bb = ((num >> 8) & 0x00FF) + amt;
    const  gg = (num & 0x0000FF) + amt;
    const r=rr>255?255:rr<0?0:rr;
    const b=bb>255?255:bb<0?0:bb;
    const g=gg>255?255:gg<0?0:gg;

    if ((g | (b << 8) | (r << 16))==0)
      return "#000000";

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }
}
