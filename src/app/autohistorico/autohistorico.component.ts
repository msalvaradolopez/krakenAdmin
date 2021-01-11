import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-autohistorico',
  templateUrl: './autohistorico.component.html',
  styleUrls: ['./autohistorico.component.sass']
})
export class AutohistoricoComponent implements OnInit, OnDestroy {

  IDUSUARIO: string = "";
  pedidoscuenta: any[] = null;
  intervalos: any = null;

  constructor(private _servicios: ServiciosService, private _toastr : ToastrService) { }

  ngOnInit(): void {
    this.IDUSUARIO = localStorage.getItem("IDUSUARIO");

    this.intervalos = setInterval(() => { this.getPedidosCuenta(); }, 5000);

    this.getPedidosCuenta();
  }

  getPedidosCuenta(){
    let param: any = {IDUSUARIO: this.IDUSUARIO, ESTATUS: "T"};

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
    }, error => this._toastr.error("Error: " + error.message, "Autorizaciones"));
  }

  ngOnDestroy() {
    clearInterval(this.intervalos);
  }
}
