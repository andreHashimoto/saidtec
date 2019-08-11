import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'
import { ICliente } from '../interface/cliente.interface';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly saidtecApiUrl = 'http://localhost:3000'

  constructor(private _httpClient: HttpClient,
    private afs: AngularFirestore) { }

  // getClientes(): Observable<ICliente[]> {
  //   return this._httpClient.get<any>(this.saidtecApiUrl);
  // }

  // getClienteById(id: number): Observable<ICliente> {
  //   return this._httpClient.get<any>(`${this.saidtecApiUrl}/${id}`);
  // }

  // deleteCliente(id: number): Observable<ICliente> {
  //   return this._httpClient.delete<any>(`${this.saidtecApiUrl}/${id}`);
  // }

  // createCliente(cliente: ICliente): Observable<ICliente> {
  //   return this._httpClient.post<any>(this.saidtecApiUrl, cliente);
  // }

  // updateCliente(cliente: ICliente): Observable<ICliente> {
  //   return this._httpClient.put<any>(this.saidtecApiUrl, cliente);
  // }

  createCliente(data) {
    return this.afs
        .collection("clientes")
        .add(data);
  }

  getClientes() {
    return this.afs.collection("clientes").snapshotChanges().pipe(
      map(clientes => clientes.map((cliente) => {
        return this.fromDocumentToICliente(cliente.payload.doc);
      })));
  }

  getClienteById(id) {
    return this.afs
      .collection("clientes")
      .doc(id)
      .get().pipe(map(cliente => this.fromDocumentToICliente(cliente)));
  }

  updateCliente(cliente) {
    console.log(cliente)
    return this.afs
      .collection("clientes")
      .doc(cliente.id)
      .set(cliente);
  }

  deleteCliente(id) {
    return this.afs
      .collection("clientes")
      .doc(id)
      .delete();
  }

  private fromDocumentToICliente(doc): ICliente {
    let c: ICliente;
    c = doc.data()
    c.id = doc.id
    return c;
  }
}
