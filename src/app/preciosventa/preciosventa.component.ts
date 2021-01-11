import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-preciosventa',
  templateUrl: './preciosventa.component.html',
  styleUrls: ['./preciosventa.component.sass']
})
export class PreciosventaComponent implements OnInit {

  IDLISTA: number = 0;
  precios: any[] = null;
  buscarMaterial: string = "";
  buscarForm: FormGroup;

  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService ) { }

  ngOnInit(): void {
    this.IDLISTA = Number.parseInt(localStorage.getItem("IDLIST"));
    this.preciosGet();

    this.buscarForm = new FormGroup({
      valorBuscar: new FormControl('')
    });

    this.buscarForm.get("valorBuscar").valueChanges.subscribe(
      data => {
        this.buscarMaterial = data;
        this.preciosGet();
      } 
    );
  }

  preciosGet() {

    this._servicios.wsGeneral("getListasPreciosDet", {IDLISTA: this.IDLISTA, valor : this.buscarMaterial})
    .subscribe( x => { 
      this.precios = x;
      this.precios.forEach(item => {
        item.ACCION = "N";
      });
    }, error => this._toastr.error("Error: " + error.message, "Precios"));
  }

  precioNew(){
    this._router.navigate(['/preciosventadet']);
  }

  precioVentaEdit(precio: any){
    let paridaEdicionSiNo: boolean = false;
    this.precios.forEach(item => {
      if (item.ACCION == "E" && item.IDLISTADET != precio.IDLISTADET) {
        paridaEdicionSiNo = true;
        this._toastr.warning("Una partida en edición.", "Precios");
      }
    });
    if (!paridaEdicionSiNo)
      precio.ACCION = "E"; // PERMITE EDITAR EL PRECIO.
  }

  precioVentaSave(precio: any){
    this._servicios.wsGeneral("setListaPrecioDet", precio)
    .subscribe(resp => {},
      error => this._toastr.error("Error: " + error.message, "Precios"),
      () => {
        precio.ACCION = "N";
        this._toastr.success("Precio actualizado", "Precios");
        this.preciosGet();
      } );
  }

  precioVentaDel(precio: any){
    let paridaEdicionSiNo: boolean = false;
    this.precios.forEach(item => {
      if (item.ACCION == "E") {
        paridaEdicionSiNo = true;
        this._toastr.warning("Una partida en edición.", "Precios");
      }
    });

    if (!paridaEdicionSiNo)
      this._servicios.wsGeneral("delListaPrecioDet", precio)
      .subscribe(resp => {},
        error => this._toastr.error("Error: " + error.message,  "Precios"),
        () => {
          this._toastr.success("Registro eliminado OK", "Precios");
          this.preciosGet();
        });

  }

  goBack () {
    this._router.navigate(['/listasprecios']);
  }

}
