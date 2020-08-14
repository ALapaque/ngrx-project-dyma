import { LayoutModule } from './../shared/modules/layout.module';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PROFILE_ROUTES } from './profile.routes';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PROFILE_ROUTES),
    LayoutModule,
  ]
})
export class ProfileModule { }
