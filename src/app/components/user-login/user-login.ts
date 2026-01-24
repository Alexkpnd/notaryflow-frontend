import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user-service';
import { MatFormField, MatLabel, MatInput, MatError} from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import { LoggedInUser, Credentials } from '../../shared/interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


type invalidLogin = {
  isInvalid: boolean;
  message: string;
}

@Component({
  selector: 'app-user-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatAnchor
],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {
  router = inject(Router)
  userService = inject(UserService);
  invalidLogin = signal<invalidLogin | null> (null);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  onSubmit(){
    this.userService.loginUser(this.loginForm.value as Credentials)
    .subscribe({
      next:(response) => {
        const access_token = response.token;
        const decodedToken = jwtDecode(access_token) as unknown as LoggedInUser;
        localStorage.setItem("access_token", access_token)
        this.userService.user.set({
          id: decodedToken.id,
          email: decodedToken.email,
          username: decodedToken.username,
          role: decodedToken.role
        })
        this.router.navigate(['user-dashboard']);
      },
      error:(error) => {
        this.invalidLogin.set({isInvalid: true, message:error.error.message});
      }
    })
  }
}
