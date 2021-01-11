import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-pedidospreciosdet',
  templateUrl: './pedidospreciosdet.component.html',
  styleUrls: ['./pedidospreciosdet.component.sass']
})
export class PedidospreciosdetComponent implements OnInit, OnDestroy {

  IDLISTADET: number = 0;
  IDPEDIDO: number = 0;
  CANTIDAD: number = 1;
  COMENTARIOS: string = "";

  precio: any = {
    IDLISTADET: null,
    IDLISTA: 0,
    IDARTICULO: "",
    CATALOGO: "",
    CATEGORIA: "",
    NOMBRE: "",
    DESCRIPCION: "",
    EXISTENCIA: 0,
    UNIDAD: "",
    PRECIO: 0.00,
    IMAGEN: ""
  };

  pedido: any = {
    IDREQUI: null,
    IDCLIENTE: "",
    IDUSUARIO: "",
    ENTREGAREN: "SU ALMACEN",
    OBSERVACIONES: "",
    FECHA: "2020-01-01",
    ESTATUS: "0"
  }

  pedidodet: any = {
    IDREQUIDET: null,
    IDREQUI: 0,
    IDLISTADET: 0,
    PRECIO: 0.00,
    CANTIDAD: 0.00,
    COMENTARIOS: ""
  }

  constructor(private _router: Router,
    private _servicios: ServiciosService,
    private _toastr: ToastrService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.IDLISTADET = Number.parseInt(localStorage.getItem("IDLISTADET"));
    this.IDPEDIDO = Number.parseInt(localStorage.getItem("IDPEDIDO"));

    this.precioGet();

  }

  precioGet() {
    let param = { IDLISTADET: this.IDLISTADET };

    this._servicios.wsGeneral("getPrecioByIdListaDet", param)
      .subscribe(x => {

        x.forEach(res => {
          this.precio.IDLISTADET = res.IDLISTADET;
          this.precio.IDLISTA = res.IDLISTA;
          this.precio.IDARTICULO = res.IDARTICULO;
          this.precio.CATALOGO = res.CATALOGO;
          this.precio.CATEGORIA = res.CATEGORIA;
          this.precio.NOMBRE = res.NOMBRE;
          this.precio.DESCRIPCION = res.DESCRIPCION;
          this.precio.EXISTENCIA = res.EXISTENCIA;
          this.precio.UNIDAD = res.UNIDAD;
          this.precio.PRECIO = res.PRECIO;
          this.precio.IMAGEN = res.IMAGEN;
        });
      });
  }

  addOrMinCtd(sumarRestar: boolean) {
    if (sumarRestar)
      this.CANTIDAD = this.CANTIDAD + 1;
    else
      this.CANTIDAD = this.CANTIDAD - 1;
  }

  goBack() {
    this._router.navigate(['/pedidos']);
  }

  addPedido() {
    if (this.IDPEDIDO == 0) {

      this.pedido.IDCLIENTE = localStorage.getItem("IDCLIENTE");
      this.pedido.IDUSUARIO = localStorage.getItem("IDUSUARIO");

      this._servicios.wsGeneral("addPedido", this.pedido)
        .subscribe(res => {
          this.IDPEDIDO = res;
          localStorage.setItem("IDPEDIDO", this.IDPEDIDO.toString());
          this.addPedidoDet();
        }, error => this._toastr.error("Error: " + error.message, "Pedido"));
    } else {
      this.addPedidoDet();
    }
  }

  addPedidoDet() {
    this.pedidodet.IDREQUI = this.IDPEDIDO;
    this.pedidodet.IDLISTADET = this.precio.IDLISTADET;
    this.pedidodet.PRECIO = this.precio.PRECIO;
    this.pedidodet.CANTIDAD = this.CANTIDAD;
    this.pedidodet.COMENTARIOS = this.COMENTARIOS;

    this._servicios.wsGeneral("addPedidoDet", this.pedidodet)
      .subscribe(res => { },
        error => this._toastr.error("Error: " + error.message, "Pedido detalle"),
        () => {
          this._toastr.success("Material se agregó al pedido exitosamente.", "Pedido");
          this.goBack();
        });
  }

  //Call this method in the image source, it will sanitize it.
  transform(base64Image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  ngOnDestroy() {
    
  }

}
