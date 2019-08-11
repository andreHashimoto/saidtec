import { Component, OnInit } from '@angular/core';
import { IItemNota } from '../interface/item-nota.interface';
import { ClienteService } from '../service/cliente.service';
import { ICliente } from '../interface/cliente.interface';

@Component({
  selector: 'app-impressao-nota',
  templateUrl: './impressao-nota.component.html',
  styleUrls: ['./impressao-nota.component.css']
})
export class ImpressaoNotaComponent implements OnInit {

  public itemNota: IItemNota = {};
  public itensNota: IItemNota[] = [];
  public somaItens: number = 0;
  public clientes: ICliente[]
  public selectedCliente: ICliente = null;
  public hoje = new Date();
  public numeroNota = Math.floor(Math.random() * 999999) + 1;
  public isLoading = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.isLoading = true;
    this.clienteService.getClientes().subscribe((clientes: any) => {
      console.log(clientes)
      this.clientes = clientes;
      this.isLoading = false;
    })
  }

  addItem(): void {
    this.itemNota.precoTotal = this.itemNota.precoUnitario * this.itemNota.quantidade;
    this.itensNota.push(this.itemNota);
    this.itemNota = {};
    this.updateSoma();
  }

  removeItem(item: IItemNota): void {
    this.itensNota.splice(this.itensNota.indexOf(item), 1);
    this.updateSoma();
  }

  updateSoma() {
    this.somaItens = this.itensNota.reduce((prev, curr) => {
      return prev + curr.precoTotal;
    }, 0);
  }

  print() {
    console.log(this.selectedCliente)
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    const printContent = document.getElementById('printing').innerHTML;
    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
        <base href="/">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <style>
        @page { size: auto;  margin: 0mm; }

        span {
            display: block;
            font-family: Arial, Helvetica, sans-serif;
        }
        
        .secao {
          margin: 5px 2px;
        }

        .borda {
            border: 1px solid black;
            border-radius: 10px;
            padding: 10px;
        }
        
        .large {
            font-size: 18px;
        }
        
        .contato {
            text-align: center;
        }
        
        .nota-debito span {
            margin: 5px 0px;
        }
        
        .info {
            margin: 10px 0px;
        }
        
        .rodape span {
            margin: 0px 0px 10px 0px;
        }
        
        </style>
      </head>
      <body onload="window.print();window.close()">
          ${printContent}
      </body>
    </html>`);
    popupWin.document.close();
  }

}
