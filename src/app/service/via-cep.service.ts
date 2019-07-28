import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IViaCEP } from '../interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly VIA_CEP_URL = "https://viacep.com.br/ws/"

  constructor(private _httpClient: HttpClient) { }

  getEnderecoFromCEP(cep: string): Observable<IViaCEP> {
    return this._httpClient.get<any>(`${this.VIA_CEP_URL}${cep}/json`);
  }

}
