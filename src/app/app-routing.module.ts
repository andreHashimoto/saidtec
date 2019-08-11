import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component'
import { ImpressaoNotaComponent } from './impressao-nota/impressao-nota.component'
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'cadastro-cliente', component: CadastroClienteComponent, canActivate: [AuthGuard]},
  { path: 'impressao-nota', component: ImpressaoNotaComponent, canActivate: [AuthGuard]},
  { path: 'lista-cliente', component: ListaClienteComponent, canActivate: [AuthGuard]},
  { path: '**', component: ImpressaoNotaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
