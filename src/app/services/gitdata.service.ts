import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { RepositoryUser } from '../models/repository-user.model';
import { Repository } from '../models/repository.model';
import { map } from 'rxjs/operators';
import { Response } from '../models/response.model';
import { SimpleUserItem } from '../models/simple-user-item.model';
import { SimpleRepositoryItem } from '../models/simple-repository-item.model';
import { SimpleUserDetail } from '../models/simple-user-detail.model';
import { findLast } from '@angular/compiler/src/directive_resolver';

const URL = 'https://api.github.com/';
@Injectable({
  providedIn: 'root'
})
export class GitDataService {

  private subject = new Subject<any>();

  search(search: string): void {
      this.subject.next(search);
  }

  getSearch(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public getTrendingUsers(search?: string): Observable<SimpleUserItem[]> {
    search = search ? `${search}` : '';
    const query = `${URL}search/users?q=${search}${!search ? `created:${this.getPreviousMonth()}` : ''}&sort=followers&order=desc&per_page=3`;
    return this.http.get<Response>(query).pipe(
      map(response =>
        response.items.map(e =>({
          login:e.login,
          avatar_url:e.avatar_url
        }) as SimpleUserItem)
    ));
  }

  public getActiveUsers(search?: string): Observable<SimpleUserItem[]>  {
    search = search ? `${search}` : '';
    const query = `${URL}search/users?q=${search}${!search ? `created:${this.getPreviousMonth()}` : ''}&sort=repositories&order=desc&per_page=3`;
    return this.http.get<Response>(query).pipe(
      map(response =>
        response.items.map(e => ({
          login: e.login,
          avatar_url: e.avatar_url
        }) as SimpleUserItem)
    ));
  }

  public getTopRepositories(search?: string): Observable<SimpleRepositoryItem[]>{
    search = search ? `${search}`: '';
    const query = `${URL}search/repositories?q=${search}${!search ? `created:${this.getPreviousYear()}` : ''}&sort=stars&order=desc&per_page=4`;
    return this.http.get<Repository>(query).pipe(
      map(response =>
        response.items
        .sort((a,b) => b.stargazers_count - a.stargazers_count)
        .map(e =>({
          name: e.name,
          stargazers_count: e.stargazers_count,
          description: e.description
        }) as SimpleRepositoryItem)
    ));
  }

  public getRepositoriesFromUser(user: string): Observable<SimpleRepositoryItem[]>{
    const query = `${URL}users/${user}/repos?sort=stars&direction=desc&per_page=3`;
    return this.http.get<RepositoryUser[]>(query).pipe(
      map(response =>
        response.map(e => ({
          name: e.name,
          stargazers_count: e.stargazers_count,
          description: e.description
        }) as SimpleRepositoryItem)
      ));
  }

  public getUser(user: string): Observable<SimpleUserDetail>{
    return this.http.get<User>(`${URL}users/${user}`).pipe(
      map(userData => ({
          name: userData.name,
          id: userData.id,
          followers: userData.followers,
          avatar_url: userData.avatar_url
        }) as SimpleUserDetail));
  }

  private getPreviousMonth(): string {
    const first = new Date(new Date().getFullYear(), new Date().getMonth() - 1).toISOString().slice(0, 10);
    const last = new Date(new Date().getFullYear(), new Date().getMonth()).toISOString().slice(0, 8) + '01';
    return `${first}..${last}`;
  }

  private getPreviousYear(): string {
    const first = new Date(new Date().getFullYear() - 2, 11).toISOString().slice(0, 8) + '31';
    const last = new Date(new Date().getFullYear(), 0).toISOString().slice(0, 8) + '01';
    return `${first}..${last}`;
  }

}
