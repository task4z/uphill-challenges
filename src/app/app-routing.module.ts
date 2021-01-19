import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found-component.component';
import { UserDeatilPageComponent } from './user-deatil-page/user-deatil-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':search', component: HomeComponent},
  {path: 'user/:login', component: UserDeatilPageComponent},{
  path: '**', component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
