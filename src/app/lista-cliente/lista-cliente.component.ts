import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { ICliente } from '../interface/cliente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  public clientes: ICliente[]

  constructor(private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: any) => {
      this.clientes = clientes;
    })
  }

  editCliente(id: number) {
    this.router.navigate(['/cadastro-cliente'], { queryParams: { cliente: id } });
  }

  removeCliente(id: number) {
    this.clienteService.deleteCliente(id).then(() => {
      this.getClientes();
    })
  }

}
