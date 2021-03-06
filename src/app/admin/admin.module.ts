import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashbordPageComponent} from './dashbord-page/dashbord-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/auth.service';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';

@NgModule({
  declarations: [AdminLayoutComponent, LoginPageComponent, DashbordPageComponent, CreatePageComponent, EditPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {
            path: '', redirectTo: '/admin/login', pathMatch: 'full'
          },
          {
            path: 'login', component: LoginPageComponent
          },
          {
            path: 'dashboard', component: DashbordPageComponent, canActivate: [AuthGuard]
          },
          {
            path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]
          },
          {
            path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]
          }
        ]
      }
    ]),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AdminModule {

}
