import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/nonRegistered/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/nonRegistered/login/login.component';
import { RegisterComponent } from './pages/nonRegistered/register/register.component';
import { DoctorComponent } from './pages/registered/doctor/doctor/doctor.component';
import { PatientComponent } from './pages/registered/patient/patient/patient.component';
import { DoctorsComponent } from './pages/registered/patient/doctors/doctors.component';
import { InfoComponent } from './pages/registered/patient/info/info.component';
import { ReportsComponent } from './pages/registered/patient/reports/reports.component';
import { ExaminationsComponent } from './pages/registered/doctor/examinations/examinations.component';
import { OverwievComponent } from './pages/registered/doctor/overwiev/overwiev.component';
import { VariousComponent } from './pages/registered/doctor/various/various.component';
import { ManagerComponent } from './pages/manager/manager/manager.component';
import { ManagerusersComponent } from './pages/manager/managerusers/managerusers.component';
import { ManageraddComponent } from './pages/manager/manageradd/manageradd.component';
import { ManagerapproveComponent } from './pages/manager/managerapprove/managerapprove.component';
import { ManagerrequestsComponent } from './pages/manager/managerrequests/managerrequests.component';
import { ManagerpassComponent } from './pages/manager/managerpass/managerpass.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DoctorComponent,
    PatientComponent,
    DoctorsComponent,
    InfoComponent,
    ReportsComponent,
    ExaminationsComponent,
    OverwievComponent,
    VariousComponent,
    ManagerComponent,
    ManagerusersComponent,
    ManageraddComponent,
    ManagerapproveComponent,
    ManagerrequestsComponent,
    ManagerpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
