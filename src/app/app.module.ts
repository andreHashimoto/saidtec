import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ImpressaoNotaComponent } from './impressao-nota/impressao-nota.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AuthGuard } from './auth.guard';

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
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCuHcZr_quE_GaT2gDdh_j0uT9vrsK23RY",
      authDomain: "saidtec-d2209.firebaseapp.com",
      databaseURL: "https://saidtec-d2209.firebaseio.com",
      projectId: "saidtec-d2209",
      storageBucket: "saidtec-d2209.appspot.com",
      messagingSenderId: "289997727423",
      appId: "1:289997727423:web:1f0388f64e6d5686"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
