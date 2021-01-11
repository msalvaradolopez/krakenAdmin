import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-listasprecios',
  templateUrl: './listasprecios.component.html',
  styleUrls: ['./listasprecios.component.sass']
})
export class ListaspreciosComponent implements OnInit {

  listas: any[] = null;
  valorBuscar: string = "";
  buscarForm: FormGroup;

  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.listasGet();

    this.buscarForm = new FormGroup({
      valorBuscar: new FormControl('')
    });

    this.buscarForm.get("valorBuscar").valueChanges.subscribe(
      data => {
        this.valorBuscar = data;
        this.listasGet();
      } 
    );
  }

  listasGet() {
    let valor = "";
    if (this.valorBuscar == "") 
      valor = "0"
    else 
      valor = this.valorBuscar;

    this._servicios.wsGeneral("getListasPrecios", {valor: valor})
    .subscribe( x => {
      this.listas = x;
      this.listas.forEach(item => {
        if(item.ESTATUS == "A")
          item.ESTATUS = "ACTIVO";
        else
          item.ESTATUS = "BAJA";
      });
    }, error  => this._toastr.error("Error: " + error, "Lista"));
  }

  listaDet(IDLISTA: string): void {
    localStorage.setItem("IDLIST", IDLISTA);
    localStorage.setItem("ACCION", "M");
    this._router.navigate(['/listaspreciosdet']);
  }

  listaAdd(): void {
    localStorage.setItem("IDLIST", "0");
    localStorage.setItem("ACCION", "N");
    this._router.navigate(['/listaspreciosdet']);
  }

  listaDel(lista: any){
    this._servicios.wsGeneral("delListaPrecio", lista)
    .subscribe(resp => {},
      error => this._toastr.error("Error: " + error.message, "Listas"),
      () => {
        this._toastr.success("Registro eliminado OK", "Listas");
        this.listasGet();
      });
  }

  preciosVenta(IDLISTA: string): void {
    localStorage.setItem("IDLIST", IDLISTA);
    localStorage.setItem("ACCION", "N");
    this._router.navigate(['/preciosventa']);
  }
}
