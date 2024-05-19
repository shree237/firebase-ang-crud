import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddResultComponent } from './components/add-result/add-result.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CustomFilterPipe } from './custom-filter.pipe';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ChartComponent } from './chart/chart.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShreeComponent } from './shree/shree.component';





const firebaseConfig = {
  apiKey: "AIzaSyBrblp2Xi3FOEDgQphKZdbCAqY9Df2A1IQ",
  authDomain: "student-management-syste-f3706.firebaseapp.com",
  projectId: "student-management-syste-f3706",
  storageBucket: "student-management-syste-f3706.appspot.com",
  messagingSenderId: "158842838903",
  appId: "1:158842838903:web:612efdebbd26d983ff0b72"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AddResultComponent,
    SearchResultComponent,
    CustomFilterPipe,
    ChartComponent,
    ShreeComponent
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    provideFirebaseApp(() => initializeApp({"projectId":"student-management-syste-f3706","appId":"1:158842838903:web:612efdebbd26d983ff0b72","storageBucket":"student-management-syste-f3706.appspot.com","apiKey":"AIzaSyBrblp2Xi3FOEDgQphKZdbCAqY9Df2A1IQ","authDomain":"student-management-syste-f3706.firebaseapp.com","messagingSenderId":"158842838903"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
