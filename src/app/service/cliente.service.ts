import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICliente } from '../interface/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly saidtecApiUrl = 'http://localhost:3000'

  constructor(private _httpClient: HttpClient) { }

  getClientes(): Observable<ICliente[]> {
    return this._httpClient.get<any>(this.saidtecApiUrl);
  }

  getClienteById(id: number): Observable<ICliente> {
    return this._httpClient.get<any>(`${this.saidtecApiUrl}/${id}`);
  }

  deleteCliente(id: number): Observable<ICliente> {
    return this._httpClient.delete<any>(`${this.saidtecApiUrl}/${id}`);
  }

  createCliente(cliente: ICliente): Observable<ICliente> {
    return this._httpClient.post<any>(this.saidtecApiUrl, cliente);
  }

  updateCliente(cliente: ICliente): Observable<ICliente> {
    return this._httpClient.put<any>(this.saidtecApiUrl, cliente);
  }
}
