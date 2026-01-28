import { Component, inject, OnInit, signal } from '@angular/core';
import { ContractService } from '../../shared/services/contract-service';
import { IContract } from '../../shared/interfaces/contract';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user-service';


@Component({
  selector: 'app-contracts-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './contracts-list.html',
  styleUrl: './contracts-list.css',
})
export class ContractsList implements OnInit {
  
  userService = inject(UserService)
  contractServive = inject(ContractService);
  contracts = signal<IContract[]>([]);

  user = this.userService.user;
  
  ngOnInit(){
    this.loadContracts();
  }
  
  loadContracts(){
    this.contractServive.viewAllContracts().subscribe({
      next:(response) => {
        console.log(response)
        this.contracts.set(response);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onClickDelete(id:string) {
    this.contractServive.deleteContract(id).subscribe({
      next:(response) => {
        console.log(response);
        this.loadContracts();
      }
    })
  }
}
