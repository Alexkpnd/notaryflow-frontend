import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { UserLogin } from './components/user-login/user-login';
import { MainPage } from './components/main-page/main-page';
import { UserRegister } from './components/user-register/user-register';

export const routes: Routes = [
    {path:'landing-page', component:LandingPage},
    {path:'', redirectTo:'landing-page', pathMatch: 'full'},
    {path:'user-login', component: UserLogin},
    {path:'user-dashboard', component: MainPage},
    {path:'user-register', component: UserRegister}
];
