import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { UserLogin } from './components/user-login/user-login';

export const routes: Routes = [
    {path:'landing-page', component:LandingPage},
    {path:'', redirectTo:'landing-page', pathMatch: 'full'},
    {path:'user-login', component: UserLogin}
];
