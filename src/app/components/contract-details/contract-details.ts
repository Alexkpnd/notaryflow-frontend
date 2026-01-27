import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContract } from '../../shared/interfaces/contract';
import { ContractService } from '../../shared/services/contract-service';


@Component({
  selector: 'app-contract-details',
  imports: [],
  templateUrl: './contract-details.html',
  styleUrl: './contract-details.css',
})
export class ContractDetails implements OnInit {

  contractService = inject(ContractService)
  activatedRoute = inject(ActivatedRoute);
  contractDetails = signal<IContract | null>(null);
  contractId = signal<string>('');

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.contractId.set(params['id']);
    })
  }

  ngOnInit() {
    this.contractService.viewContract(this.contractId()).subscribe({
      next:(response) => {
        this.contractDetails.set(response);
        
      },
      error:(error) => {
        console.log(error)
      }
    })
  }

}
