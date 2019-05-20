import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobproviderRoutingModule } from './jobprovider-routing.module';
import { CompleteprofileComponent } from './completeprofile/completeprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { AppliedUsersComponent } from './applied-users/applied-users.component';



@NgModule({
  imports: [
    CommonModule,
    JobproviderRoutingModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  declarations: [CompleteprofileComponent, ProfileComponent, AppliedUsersComponent]
})
export class JobproviderModule { }
