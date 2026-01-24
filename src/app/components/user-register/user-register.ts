import { Component, inject, signal } from '@angular/core';
import { FormArray, FormGroup, FormControl, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../shared/interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user-service';
import { Router } from '@angular/router';


  type registrationStatus =  {
      success: boolean;
      message: string;
  }

@Component({
  selector: 'app-user-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-register.html',
  styleUrl: './user-register.css',
})
export class UserRegister {
  
  userService = inject(UserService);
  router = inject(Router);
  registrationStatus = signal<registrationStatus | null> (null);
  
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[\\W_]).{8,}')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[\\W_]).{8,}')]),
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
  },
    this.passwordConfirmPasswordValidator
  )

  passwordConfirmPasswordValidator(control:AbstractControl):{[key:string]:boolean} | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({passwordMissmatch:true})
      return {passwordMissmatch:true}
    }

    return null
  }

  phone = this.registerForm.get('phone') as FormArray;

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


  onSubmit(){
    const userCreated = this.registerForm.value as IUser

    this.userService.registerUser(userCreated).subscribe({
      next: (response) => {
        this.registrationStatus.set({success:true, message: "User registered. Redirecting to Login Page..."})
        this.registerForm.reset();
        this.registerForm.markAsUntouched();
        setTimeout(()=>{
          this.router.navigate(['user-login'])
        },3000)
      },
      error: (error) => {
        //console.log('There was an error >>>', error);
        this.registrationStatus.set({success: false, message: error.error.message })
      }
    })
  }

  onResetValues(){
    this.registerForm.reset();
  }
}
