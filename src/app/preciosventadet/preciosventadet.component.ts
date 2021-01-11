import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preciosventadet',
  templateUrl: './preciosventadet.component.html',
  styleUrls: ['./preciosventadet.component.sass']
})
export class PreciosventadetComponent implements OnInit, OnDestroy {

  IDLISTA: number = 0;
  precios: any[] = null; 
  buscarMat: string = "";


  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.IDLISTA = Number.parseInt(localStorage.getItem("IDLIST"));

    this._servicios.navbarAcciones({TITULO:"", AGREGAR: false, BORRAR: false, GUARDAR: false, BUSCAR: true});
    
    this._servicios.buscarMat$
    .subscribe( buscar => {
      this.buscarMat = buscar;
      this.preciosGet();  
    });

    this.preciosGet();
  }

  preciosGet() {
    let params: any = {IDLISTA: this.IDLISTA,
                        valor : this.buscarMat};
    this._servicios.wsGeneral("getArticulos", params)
    .subscribe( x => {
      this.precios = x;
    },
    error => this._toastr.error("Error: " + error.message, "Materiales"));
  }

  precioAdd(precio: any){
    let LISTAPRECIODET: any = {
      IDLISTA: this.IDLISTA,
      IDARTICULO: precio.IDARTICULO,
      PRECIO: precio.COSTO
    }

    this._servicios.wsGeneral("setListaPrecioDet", LISTAPRECIODET).
    subscribe(resp => {},
      error => this._toastr.error("Error: " + error, "Precios"),
      () => this._toastr.success("Precio agregado OK", "Precios"));
  }

  goBack () {
    this._router.navigate(['/preciosventa']);
  }

    //Call this method in the image source, it will sanitize it.
    transform(base64Image: string){
      return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
    }  

  ngOnDestroy(){
    this._servicios.navbarAcciones({TITULO:"", AGREGAR: false, BORRAR: false, GUARDAR: false, BUSCAR: false});
  }

}
