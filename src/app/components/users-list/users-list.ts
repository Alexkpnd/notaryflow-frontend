import { Component, inject, OnInit, signal } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { deletionStatus } from '../../shared/interfaces/user';

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
  deletionStatus = signal<deletionStatus | null>(null);

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
        this.deletionStatus.set({success: true, message:`Ο χρήστης ${response.username} διαγράφηκε`});
        this.viewAllUsers();
        setTimeout(() => {
          
          this.deletionStatus.set(null)
        }, 3000);
      },
      error: (error) => {
        this.deletionStatus.set({success: false, message: error.error.message})
        setTimeout(() => {
          this.deletionStatus.set(null)
        }, 3000);
        
        
      }
    })
    
    
  }

}
