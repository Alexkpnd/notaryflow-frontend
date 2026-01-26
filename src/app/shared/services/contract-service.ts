import { inject, Injectable } from '@angular/core';

import { IContract } from '../interfaces/contract';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const CONTRACT_API_URL = `${environment.apiUrl}/api/contracts`

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  http: HttpClient = inject(HttpClient); 
  
  createContract(data: IContract) {
    return this.http.post<IContract>(CONTRACT_API_URL,data)
  }

  viewAllContracts() {
    return this.http.get<IContract[]>(CONTRACT_API_URL)
  }
}
