import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/nonRegistered/home/home.component';
import { LoginComponent } from './pages/nonRegistered/login/login.component';
import { RegisterComponent } from './pages/nonRegistered/register/register.component';
import { PatientComponent } from './pages/registered/patient/patient/patient.component';
import { DoctorComponent } from './pages/registered/doctor/doctor/doctor.component';
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


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "patient", component: PatientComponent},
  {path: "doctor", component: DoctorComponent},
  {path: "doctors", component: DoctorsComponent},
  {path: "info", component: InfoComponent},
  {path: "reports", component: ReportsComponent},
  {path: "examinations", component: ExaminationsComponent},
  {path: "overwiev", component: OverwievComponent},
  {path: "various", component: VariousComponent},
  {path: "manager", component: ManagerComponent},
  {path: "managerusers", component: ManagerusersComponent},
  {path: "manageradd", component: ManageraddComponent},
  {path: "managerapprove", component: ManagerapproveComponent},
  {path: "managerrequests", component: ManagerrequestsComponent},
  {path: "managerpass", component: ManagerpassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
