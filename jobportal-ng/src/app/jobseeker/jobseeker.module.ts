import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobseekerRoutingModule } from './jobseeker-routing.module';
import { CompleteprofileComponent } from './completeprofile/completeprofile.component';
import { ProfileComponent } from './profile/profile.component';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    JobseekerRoutingModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  declarations: [CompleteprofileComponent, ProfileComponent]
})
export class JobseekerModule { }
