import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TrendingUsersComponent } from './trending-users/trending-users.component';
import { HomeComponent } from './home/home.component';
import { UserCardComponent } from './user-card/user-card.component';
import { RepositoryCardComponent } from './repository-card/repository-card.component';
import { MostActiveUsersComponent } from './most-active-users/most-active-users.component';
import { TopRepositoriesComponent } from './top-repositories/top-repositories.component';
import { NotFoundComponent } from './not-found/not-found-component.component';
import { UserDeatilPageComponent } from './user-deatil-page/user-deatil-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TrendingUsersComponent,
    HomeComponent,
    UserCardComponent,
    RepositoryCardComponent,
    MostActiveUsersComponent,
    TopRepositoriesComponent,
    NotFoundComponent,
    UserDeatilPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
