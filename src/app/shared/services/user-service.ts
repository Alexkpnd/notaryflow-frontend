import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Credentials, LoggedInUser } from '../interfaces/user';

const API_AUTH_URL = `${environment.apiUrl}/api/auth`;


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


}
