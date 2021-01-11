import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-pedidodet',
  templateUrl: './pedidodet.component.html',
  styleUrls: ['./pedidodet.component.sass']
})
export class PedidodetComponent implements OnInit {

  IDPEDIDO: number = 0;
  pedido: any = null;
  partidas: any[] = null;
  total: number = 0.00;
  pedidoSiNO: boolean = false;
  IDUSUARIO: string = "";

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {

    this.IDUSUARIO = localStorage.getItem("IDUSUARIO");
    this.IDPEDIDO = Number.parseInt(localStorage.getItem("IDPEDIDO"));
    if (this.IDPEDIDO != 0)
      this.getPedido();
  }

  getPedido() {

    this.pedido = [];
    this.partidas = [];

    let param: any = {
      IDREQUI: this.IDPEDIDO
    }

    this._servicios.wsGeneral("getPedido", param)
      .subscribe(resp => {
        if (resp.ESTATUS == "0") {
          this.pedido = resp;
          this._servicios.wsGeneral("getPedidoDet", param)
            .subscribe(res => {
              this.partidas = res;
              this.calcularTotal();
            });
        }

      });

  }


  calcularTotal() {
    this.total = 0.00;
    this.partidas.forEach(item => {
      item.TOTAL = item.CANTIDAD * item.PRECIO;
      this.total = this.total + item.TOTAL;
    });
    if (this.total > 0)
      this.pedidoSiNO = true;
    else
      this.pedidoSiNO = false;
  }

  addOrMinCtd(sumarRestar: boolean, item: any) {
    if (sumarRestar)
      item.CANTIDAD = item.CANTIDAD + 1;
    else
      item.CANTIDAD = item.CANTIDAD - 1;

    this.calcularTotal();
  }

  delPedidoDet(pedidoDet: any) {

    this._servicios.wsGeneral("delPedidoDet", pedidoDet)
      .subscribe(resp => {
        this._toastr.success("Registro eliminado con exito.", "Pedido");
        this.getPedido();
      });
  }


  generarPedido() {

    this.pedido.ESTATUS = "P";
    this.pedido.IDAUTORIZA = this.IDUSUARIO;

    this._servicios.wsGeneral("updPedidoDet", this.partidas)
      .subscribe(resp => {
        this._servicios.wsGeneral("updPedido", this.pedido)
          .subscribe(resp => { },
            error => this._toastr.error("Error: " + error.message, "Pedido"),
            () => { });
      },
        error => this._toastr.error("Error : " + error.message, "Pedido detalle"),
        () => {
          this.pedido = [];
          this.partidas = [];
          this.IDPEDIDO = 0;
          this.total = 0;
          localStorage.setItem("IDPEDIDO", "0");
          this._toastr.success("Pedido ingresado OK", "Pedido");
        });
  }

  updPedidoDet(pedidoDet: any) {

    this._servicios.wsGeneral("updPedidoDet", pedidoDet)
      .subscribe(resp => { },
        error => this._toastr.error("Error: " + error.message, "Pedidos detalle"),
        () => this._toastr.success("Detalle de pedido OK", "Pedido detalle"));
  }
}
