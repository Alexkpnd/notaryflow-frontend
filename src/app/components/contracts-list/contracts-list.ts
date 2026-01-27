import { Component, inject, OnInit, signal } from '@angular/core';
import { ContractService } from '../../shared/services/contract-service';
import { IContract } from '../../shared/interfaces/contract';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';


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
  
  contractServive = inject(ContractService);
  contracts = signal<IContract[]>([]);
  
  ngOnInit(){
    this.contractServive.viewAllContracts().subscribe({
      next:(response) => {
        this.contracts.set(response);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
