import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-listaspreciosdet',
  templateUrl: './listaspreciosdet.component.html',
  styleUrls: ['./listaspreciosdet.component.sass']
})
export class ListaspreciosdetComponent implements OnInit {

  titulo : string = "Agregando lista."
  IDLISTA: number = 0;
  catClientes: any[] = null;
  accion: string = "N";
  validaCaptura: FormGroup;

  catEstatus: any[] = [
    {IDTIPO: "A", NOMBRE: "ACTIVO"},
    {IDTIPO: "B", NOMBRE: "BAJA"}
  ];

  lista: any = {
    IDLISTA : 0,
    IDCLIENTE : "",
    NOMBRE : "",
    ESTATUS : "A"
  }

  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.IDLISTA = Number.parseInt(localStorage.getItem("IDLIST"));
    this.accion = localStorage.getItem("ACCION");

    this.validaCaptura = new FormGroup({
      IDLISTA : new FormControl(null, []),
      IDCLIENTE : new FormControl("", [Validators.required]),
      NOMBRE : new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      ESTATUS : new FormControl("A", [Validators.required])
    });

    this._servicios.wsGeneral("getClientes", {valor: "0"})
    .subscribe(x => this.catClientes = x,
      error => this._toastr.error("Error: " + error.message, "Clientes"));

    if (this.accion == "M"){

      this.titulo = "Modificando Lista."
      let param = {valor : this.IDLISTA};
  
      this._servicios.wsGeneral("getListasPreciosById", param)
      .subscribe( x => {
        x.forEach(resp => {
          this.validaCaptura.setValue({
            IDLISTA : resp.IDLISTA,
            IDCLIENTE : resp.IDCLIENTE,
            NOMBRE : resp.NOMBRE,
            ESTATUS : resp.ESTATUS
          });
        });
      });
    }
  }

  setLista(){
    let ws = "";
    if (this.accion == "M")
      ws = "updListaPrecio";
    else
      ws = "addListaPrecio";

    this._servicios.wsGeneral(ws, this.validaCaptura.getRawValue())
    .subscribe( resp => {
      if (resp.dato == "0")
        {
          this._toastr.success(resp.valor, "Listas");
          this.goBack();
        } else
          this._toastr.error(resp.valor, "Listas");
      }, error => this._toastr.error("Error: " + error.message, "Listas"));
  }

  goBack(): void {
    this._router.navigate(['/listasprecios']);
  }

  // validacion de campos generales.
  validaCampo(campo: string): boolean {
    return this._servicios.isValidField(this.validaCaptura, campo);
  }

  mensajeErrorCampo(campo: string): string {
    return this._servicios.getErrorMessageField(this.validaCaptura, campo);
  }

  ngOnDestroy() {
    localStorage.removeItem("IDLIST");
    localStorage.removeItem("ACCION");
  }
}
