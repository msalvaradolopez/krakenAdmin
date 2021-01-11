import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-pedidoscuenta',
  templateUrl: './pedidoscuenta.component.html',
  styleUrls: ['./pedidoscuenta.component.sass']
})
export class PedidoscuentaComponent implements OnInit, OnDestroy {

  IDUSUARIO: string = "";
  pedidoscuenta: any[] = null;
  intervalos: any = null;

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.IDUSUARIO = localStorage.getItem("IDUSUARIO");

    this.getPedidosCuenta(); 
    this.intervalos = setInterval(() => { this.getPedidosCuenta(); }, 5000);

  }

  getPedidosCuenta(){
    let param: any = {IDUSUARIO: this.IDUSUARIO};

    this._servicios.wsGeneral("getPedidosByUser", param)
    .subscribe(resp => {
      this.pedidoscuenta = resp;
      this.pedidoscuenta.forEach(requi => {
        let total: number = 0.00;

        requi.REQUIDET.forEach(requidet => {
          requidet.IMPORTE = requidet.CANTIDAD * requidet.PRECIO;
          total = total + requidet.IMPORTE;  
        });
        
        requi.TOTAL = total;
      });
    } );
  }

  cancelaPedido(PEDIDO: any){
    
    PEDIDO.ESTATUS = "C";
    this._servicios.wsGeneral("updPedido",PEDIDO)
    .subscribe(x => {},
    error => this._toastr.error("Error: " + error.message, "Cuentas"),
    () => {
      this._toastr.success("Registro cancelado OK", "Cuentas");
      this.getPedidosCuenta();
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalos);
  }

}
