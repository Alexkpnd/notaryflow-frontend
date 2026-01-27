import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContractService } from '../../shared/services/contract-service';
import { IContract } from '../../shared/interfaces/contract';
import { MatInputModule } from '@angular/material/input'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


type contractCreationStatus = {
  success: boolean;
  message: string;

}

@Component({
  selector: 'app-contract-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule
],
  templateUrl: './contract-create.html',
  styleUrl: './contract-create.css',
})
export class ContractCreate {
  contractService = inject(ContractService);
  contractStatus = signal<contractCreationStatus | null>(null);


  

  newContractForm = new FormGroup({
    contractNum: new FormControl('', Validators.required),
    contractSeller: new FormControl(''),
    contractBuyer: new FormControl(''),
    contractPrice: new FormControl(''),
    propertyArea: new FormControl(''),
    isSigned: new FormControl(false),
  })

  onSubmit(){
    const contractCreated = this.newContractForm.value as IContract;
    
    this.contractService.createContract(contractCreated).subscribe({
      next:(response) => {
        this.contractStatus.set({success:true, message:"Contract Created successfully"})
        
      },
      error: (error) => {
        this.contractStatus.set({success:false, message:error.error.message})
      }
    })
  }
  onResetValues(){
    this.newContractForm.reset();
  }

  
}
