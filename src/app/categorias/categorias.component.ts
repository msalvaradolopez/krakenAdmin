import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.sass']
})
export class CategoriasComponent implements OnInit {

  categorias: any[] = null;
  valorBuscar: string = "";
  buscarForm: FormGroup;

  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoriasGet();

    this.buscarForm = new FormGroup({
      valorBuscar: new FormControl('')
    });

    this.buscarForm.get("valorBuscar").valueChanges.subscribe(
      data => {
        this.valorBuscar = data;
        this.categoriasGet();
      } 
    );
  }

  categoriasGet() {
    let valor = "";
    if (this.valorBuscar == "") 
      valor = "0"
    else 
      valor = this.valorBuscar;

    this._servicios.wsGeneral("getCategorias", {valor: valor})
    .subscribe( x => {this.categorias = x  }, 
      error => this._toastr.error("Error: " + error.message, "Categorías"));
  }

  categoriaDet(IDCATEGORIA: string): void {
    localStorage.setItem("IDCATEGORIA", IDCATEGORIA);
    localStorage.setItem("ACCION", "M");
    this._router.navigate(['/categoriasdet']);
  }

  categoriaNew(): void {
    localStorage.setItem("IDCATEGORIA", "0");
    localStorage.setItem("ACCION", "N");
    this._router.navigate(['/categoriasdet']);
  }

  categoriaDel(categoria: any): void {
    
    this._servicios.wsGeneral("delCategoria", categoria)
    .subscribe( x => {},
    error => this._toastr.error("Error: " + error.message, "Categorías"),
    () => {
      this.categoriasGet();
      this._toastr.success("Registro eliminado OK", "Categorías");
    });
  }

}
