import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-autopendientes',
  templateUrl: './autopendientes.component.html',
  styleUrls: ['./autopendientes.component.sass']
})
export class AutopendientesComponent implements OnInit, OnDestroy {

  IDUSUARIO: string = "";
  pedidoscuenta: any[] = null;
  
  intervalos:any = null;

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.IDUSUARIO = localStorage.getItem("IDUSUARIO");

    this.intervalos = setInterval(() => { this.getPedidosCuenta(); }, 5000);

    this.getPedidosCuenta();
  }

  getPedidosCuenta(){
    let param: any = {IDUSUARIO: this.IDUSUARIO, ESTATUS: "P"};

    this._servicios.wsGeneral("getPedidosByUserAndEstatus", param)
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
    }, error => this._toastr.error("Error: " + error.message, "Autorizaciones") );
  }

  cancelaPedido(PEDIDO: any){
    
    PEDIDO.ESTATUS = "N";
    PEDIDO.IDAUTORIZA = this.IDUSUARIO;
    this._servicios.wsGeneral("updPedido",PEDIDO)
    .subscribe(x => this.getPedidosCuenta(),
    error => this._toastr.error("Error : " + error.message, "Autorizaciones"),
    () => this._toastr.success("Pedido cancelado OK", "Autorizaciones"));
  }

  aceptarPedido(PEDIDO: any){
    
    PEDIDO.ESTATUS = "A";
    PEDIDO.IDAUTORIZA = this.IDUSUARIO;
    this._servicios.wsGeneral("updPedido",PEDIDO)
    .subscribe(x => this.getPedidosCuenta(),
    error => this._toastr.error("Error: " + error.message, "Autorizaciones"),
    () => this._toastr.success("Pedido actualizado OK", "Autorizaciones"));
  }

  ngOnDestroy() {
    clearInterval(this.intervalos);
  }

}
