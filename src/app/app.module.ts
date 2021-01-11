import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ReactiveFormsModule } from '@angular/forms';
import { NgxConfirmBoxModule,NgxConfirmBoxService } from 'ngx-confirm-box';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientedetComponent } from './clientedet/clientedet.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariodetComponent } from './usuariodet/usuariodet.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { ListaspreciosComponent } from './listasprecios/listasprecios.component';
import { ListaspreciosdetComponent } from './listaspreciosdet/listaspreciosdet.component';
import { PreciosventaComponent } from './preciosventa/preciosventa.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidospreciosComponent } from './pedidosprecios/pedidosprecios.component';
import { PedidospreciosdetComponent } from './pedidospreciosdet/pedidospreciosdet.component';
import { PedidodetComponent } from './pedidodet/pedidodet.component';
import { AlertboxComponent } from './alertbox/alertbox.component';
import { PedidoscuentaComponent } from './pedidoscuenta/pedidoscuenta.component';
import { AutorizacionesComponent } from './autorizaciones/autorizaciones.component';
import { AutopendientesComponent } from './autopendientes/autopendientes.component';
import { AutoenrutasComponent } from './autoenrutas/autoenrutas.component';
import { AutoentregadosComponent } from './autoentregados/autoentregados.component';
import { AutohistoricoComponent } from './autohistorico/autohistorico.component';
import { CategoriasdetComponent } from './categoriasdet/categoriasdet.component';
import { MaterialesdetComponent } from './materialesdet/materialesdet.component';
import { PreciosventadetComponent } from './preciosventadet/preciosventadet.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ClientesComponent,
    ClientedetComponent,
    UsuariosComponent,
    UsuariodetComponent,
    CategoriasComponent,
    MaterialesComponent,
    ListaspreciosComponent,
    ListaspreciosdetComponent,
    PreciosventaComponent,
    PedidosComponent,
    PedidospreciosComponent,
    PedidospreciosdetComponent,
    PedidodetComponent,
    AlertboxComponent,
    PedidoscuentaComponent,
    AutorizacionesComponent,
    AutopendientesComponent,
    AutoenrutasComponent,
    AutoentregadosComponent,
    AutohistoricoComponent,
    CategoriasdetComponent,
    MaterialesdetComponent,
    PreciosventadetComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxConfirmBoxModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: "increasing",
      
    })
  ],
  providers: [NgxConfirmBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
