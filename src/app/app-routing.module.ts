import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorizacionesComponent } from './autorizaciones/autorizaciones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriasdetComponent } from './categoriasdet/categoriasdet.component';
import { ClientedetComponent } from './clientedet/clientedet.component';
import { ClientesComponent } from './clientes/clientes.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListaspreciosComponent } from './listasprecios/listasprecios.component';
import { ListaspreciosdetComponent } from './listaspreciosdet/listaspreciosdet.component';
import { LoginComponent } from './login/login.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { MaterialesdetComponent } from './materialesdet/materialesdet.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidospreciosdetComponent } from './pedidospreciosdet/pedidospreciosdet.component';
import { PreciosventaComponent } from './preciosventa/preciosventa.component';
import { PreciosventadetComponent } from './preciosventadet/preciosventadet.component';
import { UsuariodetComponent } from './usuariodet/usuariodet.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [{ path: 'home', component: InicioComponent},
{ path: 'login', component: LoginComponent},
{ path: 'clientes', component: ClientesComponent},
{ path: 'clientesdet', component: ClientedetComponent },
{ path: 'usuarios', component: UsuariosComponent},
{ path: 'usuariosdet', component: UsuariodetComponent },
{ path: 'categorias', component: CategoriasComponent},
{ path: 'categoriasdet', component: CategoriasdetComponent},
{ path: 'materiales', component: MaterialesComponent},
{ path: 'materialesdet', component: MaterialesdetComponent},
{ path: 'listasprecios', component: ListaspreciosComponent},
{ path: 'listaspreciosdet', component: ListaspreciosdetComponent},
{ path: 'preciosventa', component: PreciosventaComponent},
{ path: 'preciosventadet', component: PreciosventadetComponent},
{ path: 'pedidos', component: PedidosComponent},
{ path: 'pedidospreciosdet', component: PedidospreciosdetComponent},
{ path: 'autorizaciones', component: AutorizacionesComponent},
{ path: '',   redirectTo: '/login', pathMatch: 'full' },
{ path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
