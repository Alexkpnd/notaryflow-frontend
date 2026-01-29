import { Component, inject, signal } from '@angular/core';
import { FormArray, FormGroup, FormControl, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser, registrationStatus } from '../../shared/interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {

  userService = inject(UserService);
  router = inject(Router);
  registrationStatus = signal<registrationStatus | null> (null);

  createUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[\\W_]).{8,}')]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      streetNum: new FormControl(''),
      postCode: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl('')
    }),
    phone: new FormArray([
      new FormGroup({
        type: new FormControl(''),
        phoneNum: new FormControl('')
      })
    ])
  })

  

  phone = this.createUserForm.get('phone') as FormArray;

  addPhoneNumber(){
    this.phone.push(
      new FormGroup({
        phoneNum: new FormControl(''),
        type: new FormControl('')
      })
    )
  }

  deletePhoneNumber(index:number){
    this.phone.removeAt(index);
  }

  onResetValues(){
    this.createUserForm.reset();
  }

  onSubmit(){
    const userCreated = this.createUserForm.value as IUser

    this.userService.createUser(userCreated).subscribe({
      next: (response) => {
        this.registrationStatus.set({success:true, message: "O χρήστης δημιουργήθηκε"})
        this.createUserForm.reset();
        setTimeout(() => {
          this.router.navigate(['users-list'])
        }, 3000);
        
        
      },
      error: (error) => {
        this.registrationStatus.set({success: false, message: error.error.message })
      }
    })
  }

}
