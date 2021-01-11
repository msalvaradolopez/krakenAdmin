import { Component, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pedidosprecios',
  templateUrl: './pedidosprecios.component.html',
  styleUrls: ['./pedidosprecios.component.sass']
})
export class PedidospreciosComponent implements OnInit, OnDestroy {

  IDLISTA: number = 0;
  precios: any[] = null; 
  buscarMat: string = "";

  constructor(private _router: Router, private _servicios: ServiciosService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    this._servicios.navbarAcciones({TITULO:"", AGREGAR: false, BORRAR: false, GUARDAR: false, BUSCAR: true});
    this.IDLISTA = Number.parseInt(localStorage.getItem("IDLISTA"));

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
    this._servicios.wsGeneral("getListasPreciosDet", params)
    .subscribe( x => {
      this.precios = x;
    });
  }

  precioDet(precio: any){
    localStorage.setItem("IDLISTADET", precio.IDLISTADET);
    this._router.navigate(['/pedidospreciosdet']);
  }

  //Call this method in the image source, it will sanitize it.
  transform(base64Image: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  ngOnDestroy() {
    this._servicios.navbarAcciones({TITULO:"", AGREGAR: false, BORRAR: false, GUARDAR: false, BUSCAR: false});
  }

}
