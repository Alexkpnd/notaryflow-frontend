import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../shared/services/user-service';
import { IUser } from '../../shared/interfaces/user';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
 userService = inject(UserService);
 myProfile = signal<IUser | null>(null);

ngOnInit() {
  this.userService.showMe().subscribe({
    next: (response) => {
      this.myProfile.set(response);
    }
  })
}
}
