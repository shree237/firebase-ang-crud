import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { AddResultComponent } from './components/add-result/add-result.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ChartComponent } from './chart/chart.component';



const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'home/login', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  { path: 'add-result', component: AddResultComponent },
  { path: 'editresult/:id', component: AddResultComponent },
  {path:'verify-email', component:VerifyEmailComponent},
  {path:'forgot-pass', component:ForgotPasswordComponent},
  {path:'search-result', component:SearchResultComponent},
  {path:'home/search-result', component:SearchResultComponent},
  {path:'search-result/result/:rollno', component:SearchResultComponent},
  { path: 'chart', component: ChartComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
