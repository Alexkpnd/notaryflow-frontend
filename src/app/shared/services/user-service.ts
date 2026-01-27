import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Credentials, LoggedInUser } from '../interfaces/user';
import { IUser } from '../interfaces/user';

const API_AUTH_URL = `${environment.apiUrl}/api/auth`;
const API_USERS_URL = `${environment.apiUrl}/api/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http:HttpClient = inject(HttpClient);
  
  user = signal<LoggedInUser | null>(null);

  constructor(){
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      const decodedToken = jwtDecode(access_token) as unknown as LoggedInUser;
      this.user.set({
        id: decodedToken.id,
        email: decodedToken.email,
        username: decodedToken.username,
        role: decodedToken.role
      })
    }
  }
  
  loginUser(credentials: Credentials) {
    const request = this.http.post<{token:string}>(
      `${API_AUTH_URL}/login`, credentials
    )
    return request
  }

  logoutUser(){
    this.user.set(null);
    localStorage.removeItem('access_token')
  }

  registerUser(userRegisterData:IUser){
    return this.http.post<IUser>(`${API_AUTH_URL}/register`, userRegisterData);
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      const now = Math.floor(Date.now()/1000);
      return exp < now;
    } catch (error) {
      return true;
    }
  }

  viewAllUsers(){
    return this.http.get<IUser[]>(API_USERS_URL)
  }

  showMe(){
    return this.http.get<IUser>(`${API_AUTH_URL}/me`)
  }
}
