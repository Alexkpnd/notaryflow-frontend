import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { UserLogin } from './components/user-login/user-login';
import { MainPage } from './components/main-page/main-page';
import { UserRegister } from './components/user-register/user-register';
import { ContractCreate } from './components/contract-create/contract-create';
import { authGuard } from './shared/guards/auth-guard';
import { ContractsList } from './components/contracts-list/contracts-list';

export const routes: Routes = [
    {path:'landing-page', component:LandingPage, title:'Notary Flow'},
    {path:'', redirectTo:'landing-page', pathMatch: 'full'},
    {path:'user-login', component: UserLogin},
    {path:'user-dashboard', component: MainPage, canActivate:[authGuard]},
    {path:'user-register', component: UserRegister},
    {path:'contract-create', component: ContractCreate, canActivate:[authGuard]},
    {path:'contracts-list', component: ContractsList, canActivate:[authGuard]}
];
