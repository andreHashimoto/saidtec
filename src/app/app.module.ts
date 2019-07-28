import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ImpressaoNotaComponent } from './impressao-nota/impressao-nota.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component'
import { AngularFontAwesomeModule } from 'angular-font-awesome';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    CadastroClienteComponent,
    ImpressaoNotaComponent,
    ListaClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
