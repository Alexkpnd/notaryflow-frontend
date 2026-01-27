import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../shared/services/user-service';
import { IUser } from '../../shared/interfaces/user';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormField } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatButtonModule, MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, MatInputModule,],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
 userService = inject(UserService);
 myDBself = signal<IUser | null>(null);

 form =new FormGroup({
  firstname: new FormControl('')
 })
 
 ngOnInit(): void {
   this.userService.viewMyself().subscribe({
    next: (response) => {
      this.myDBself.set(response)
    }
   })
 }

//  onUpdate(){
//   this.form.patchValue({firstname:this.myDBself()?.firstname,});
//   //this.userService.updateMyself(this.userService.user?.id, updatedData.firstname)
//  }

}
