import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.sass']
})
export class ClientesComponent implements OnInit, OnDestroy, AfterViewChecked {

  clientes: any[] = null;
  valorBuscar: string = "";
  buscarForm: FormGroup;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.clientesGet();

    this._servicios.buscarMat$
      .subscribe(resp => {
        this.valorBuscar = resp;
        this.clientesGet();
      });

    this._servicios.navbarRespIcono$
      .subscribe(resp => {
        if (resp == "AGREGAR")
          this.clienteNew();
      });

  }

  ngAfterViewChecked() {
    this._servicios.navbarAcciones({ TITULO: "", AGREGAR: true, BORRAR: false, GUARDAR: false, BUSCAR: true });
    // this._servicios.activarBuscarMaterial(true);
  }

  clientesGet() {
    let valor = "";
    if (this.valorBuscar == "")
      valor = "0"
    else
      valor = this.valorBuscar;

    this._servicios.wsGeneral("getClientes", { valor: valor })
      .subscribe(x => {
        this.clientes = x;
        x.forEach(element => {
          if (element.ESTATUS == "A")
            element.ESTATUS = "ACTIVO";
          else
            element.ESTATUS = "BAJA";
        });
      }, error => this._toastr.error("Error :" + error.message, "Clientes"));
  }

  clienteDet(IDCLIENTE: string): void {
    localStorage.setItem("IDCTE", IDCLIENTE);
    localStorage.setItem("ACCION", "M");
    this._router.navigate(['/clientesdet']);
  }

  clienteDel(cliente: any): void {

    this._servicios.wsGeneral("delCliente", cliente)
      .subscribe(x => { },
        error => this._toastr.error("Error: " + error.message, "Clientes"),
        () => {
          this.clientesGet();
          this._toastr.success("Registro eliminado OK", "Clientes");
        });
  }

  clienteNew(): void {
    localStorage.setItem("IDCTE", "0");
    localStorage.setItem("ACCION", "N");
    this._router.navigate(['/clientesdet']);
  }

  ngOnDestroy() {
    // this._servicios.activarBuscarMaterial(false);
    this._servicios.navbarAcciones({ TITULO: "", AGREGAR: false, BORRAR: false, GUARDAR: false, BUSCAR: false });    
  }

}
