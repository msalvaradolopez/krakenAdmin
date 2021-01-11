import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-categoriasdet',
  templateUrl: './categoriasdet.component.html',
  styleUrls: ['./categoriasdet.component.sass']
})
export class CategoriasdetComponent implements OnInit, OnDestroy {
  titulo : string = "Agregando categoría."
  IDCATEGORIA: string = "";
  accion : string = "N";
  validaCaptura: FormGroup;

  categoria: any = {
    IDCATEGORIA: "",
    NOMBRE: "",
  }

  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.IDCATEGORIA = localStorage.getItem("IDCATEGORIA");
    this. accion  = localStorage.getItem("ACCION");

    this.validaCaptura = new FormGroup({
      IDCATEGORIA: new FormControl({ value: '',  disabled: this.accion == "M" }, [Validators.required, Validators.maxLength(10)]),
      NOMBRE: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
    });

    if (this.accion == "M") {
      this.titulo = "Modificando categoría";

      this._servicios.wsGeneral("getCategoriasById", {valor: this.IDCATEGORIA})
      .subscribe(resp => {
        this.validaCaptura.setValue({
          IDCATEGORIA: resp.IDCATEGORIA,
          NOMBRE: resp.NOMBRE
        });
      }, error => this._toastr.error("Error: " + error.message, "Categorías"),
      () => this.validaCaptura.markAllAsTouched());
    }
  }

  setCategoria(){
    let ws = "";
    if (this.accion == "M")
      ws = "updCategoria";
    else
      ws = "addCategoria";

    this._servicios.wsGeneral(ws, this.validaCaptura.getRawValue())
    .subscribe(resp => {
      if (resp.dato == "0"){
        this._toastr.success(resp.valor, "Categorías");
        this.goBack()
      }
      else 
        this._toastr.error(resp.valor, "Categorías");
    }, error => this._toastr.error("Error: "+ error.message, "Categoría"));
  }

  goBack(): void {
    this._router.navigate(['/categorias']);
  }

  // validacion de campos generales.
  validaCampo(campo: string): boolean {
    return this._servicios.isValidField(this.validaCaptura, campo);
  }

  mensajeErrorCampo(campo: string): string {
    return this._servicios.getErrorMessageField(this.validaCaptura, campo);
  }


  ngOnDestroy() {
    localStorage.removeItem("IDCATEGORIA");
    localStorage.removeItem("ACCION");
  }

}
