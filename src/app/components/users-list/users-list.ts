import { Component, inject, OnInit, signal } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user-service';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {
  userService = inject(UserService)
  users = signal<IUser[]>([]);


  ngOnInit(){
    this.userService.viewAllUsers().subscribe({
      next:(response) => {
        this.users.set(response);
      }
    })
  }
}
