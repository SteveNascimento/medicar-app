import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { AccountService } from '../shared/services/account.service';
import { ServicesModule } from '../shared/services/services.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ConsultasComponent,
    AuthenticationComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    ServicesModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
