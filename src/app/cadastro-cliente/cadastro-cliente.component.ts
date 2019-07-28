import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViaCepService } from '../service/via-cep.service';
import { IViaCEP } from '../interface';
import { ClienteService } from '../service/cliente.service';
import { ICliente } from '../interface/cliente.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  public clientForm: FormGroup;
  public isEdit = false;
  public isLoading = false;

  constructor(private cepService: ViaCepService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.handleQueryParam()
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      id: 0,
      nome: [''],
      cep: [''],
      estado: [''],
      cidade: [''],
      municipio: [''],
      bairro: [''],
      endereco: [''],
      cnpjcpf: [''],
      inscricaoEstadual: [''],
      pagamento: [''],
      retirada: ['']
    });
  }

  handleQueryParam() {
    let clienteId = 0;
    this.route.queryParams.subscribe(params => {
      clienteId = params['cliente'] || 0;
    });
    if (clienteId) {
      this.isLoading = true;
      this.isEdit = true;
      this.getCliente(clienteId);
    }
  }

  getCliente(id: number) {
    this.clienteService.getClienteById(id).subscribe((cliente: ICliente) => {
      this.clientForm.patchValue({
        id: cliente.id,
        nome: cliente.nome,
        cep: cliente.cep,
        estado: cliente.estado,
        cidade: cliente.cidade,
        municipio: cliente.municipio,
        bairro: cliente.bairro,
        endereco: cliente.endereco,
        cnpjcpf: cliente.cnpjcpf,
        inscricaoEstadual: cliente.inscricaoEstadual,
        pagamento: cliente.pagamento,
        retirada: cliente.retirada
      })
      this.isLoading = false;
    })
  }

  onSubmit() {
    // if (this.clientForm.invalid) {
    //     return;
    // }
    this.isLoading = true;
    let submitPromise = null;

    if (this.isEdit) {
      submitPromise = this.clienteService.updateCliente(this.clientForm.value);
    } else {
      submitPromise = this.clienteService.createCliente(this.clientForm.value);
    }

    submitPromise.subscribe((cliente: ICliente) => {
      this.isLoading = false;
      this.resetClienteForm()
      this.isEdit = false;
      this.router.navigate(['/cadastro-cliente']);
    })

  }

  resetClienteForm() {
    this.clientForm.patchValue({
      id: 0,
      nome: '',
      cep: '',
      estado: '',
      cidade: '',
      municipio: '',
      bairro: '',
      endereco: '',
      cnpjcpf: '',
      inscricaoEstadual: '',
      pagamento: '',
      retirada: ''
    })
  }

  onBlurCEP(cep: string) {
    this.cepService.getEnderecoFromCEP(cep).subscribe((viaCEP: IViaCEP) => {
      console.log(viaCEP);
      this.clientForm.patchValue({
        bairro: viaCEP.bairro,
        cidade: viaCEP.localidade,
        estado: viaCEP.uf,
        endereco: viaCEP.logradouro
      })
    });
  }

}
