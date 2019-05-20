import { AppliedUsersComponent } from './applied-users/applied-users.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteprofileComponent } from './completeprofile/completeprofile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'complete_profile', component: CompleteprofileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'applied_users/:id', component: AppliedUsersComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobproviderRoutingModule { }
