import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.sass']
})
export class MaterialesComponent implements OnInit {

  materiales: any[] = null;
  valorBuscar: string = "";
  buscarForm: FormGroup;

  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.materialesGet();

    this.buscarForm = new FormGroup({
      valorBuscar: new FormControl('')
    });

    this.buscarForm.get("valorBuscar").valueChanges.subscribe(
      data => {
        this.valorBuscar = data;
        this.materialesGet();
      } 
    );
  }

  materialesGet() {
    let valor = "";
    if (this.valorBuscar == "") 
      valor = "0"
    else 
      valor = this.valorBuscar;

    this._servicios.wsGeneral("getArticulos", {valor: valor})
    .subscribe( x => {
      this.materiales = x;
      this.materiales.forEach(item => {
        if (item.ESTATUS == "A")
          item.ESTATUS = "ACTIVO";
        else
          item.ESTATUS = "BAJA";
      });
    },
      error => this._toastr.error("Error: " + error.message, "Materiales"));
  }

  materialNew(){
    localStorage.setItem("IDARTICULO", "0");
    localStorage.setItem("ACCION", "N");
    this._router.navigate(['/materialesdet']);
  }

  materialDet(IDARTICULO: string){
    localStorage.setItem("IDARTICULO", IDARTICULO);
    localStorage.setItem("ACCION", "M");
    this._router.navigate(['/materialesdet']);
  }

  materialDel(material: any){
    this._servicios.wsGeneral("delArticulo", material)
    .subscribe(resp => {},
      error => this._toastr.error("Error: " + error.message, "Material"),
      () => {
        this._toastr.success("Registro eliminado OK", "Material");
        this.materialesGet();
      } );
  }
}
