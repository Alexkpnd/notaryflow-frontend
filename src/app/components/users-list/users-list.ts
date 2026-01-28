import { Component, inject, OnInit, signal } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [RouterLink],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {
  userService = inject(UserService)
  users = signal<IUser[]>([]);
  router = inject(Router)


  ngOnInit(){
    this.viewAllUsers();
  }
  
  
  viewAllUsers(){
    this.userService.viewAllUsers().subscribe({
      next:(response) => {
        this.users.set(response);
      }
    })
  }

  onClickDel(id:string) {
    this.userService.removeUser(id).subscribe({
      next:(response) => {
        this.viewAllUsers();
      }
    })
  }

}
