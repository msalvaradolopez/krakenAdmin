import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';
import { NgxConfirmBoxService } from 'ngx-confirm-box';

@Component({
  selector: 'app-clientedet',
  templateUrl: './clientedet.component.html',
  styleUrls: ['./clientedet.component.sass']
})
export class ClientedetComponent implements OnInit, OnDestroy {

  bgColor = 'rgba(0,0,0,0.5)'; // overlay background color
  confirmHeading = '';
  confirmContent = "Confirmar eliminar el registro.";
  confirmCanceltext = "Cancelar";
  confirmOkaytext = "Eliminar";

  titulo: string = "Agregando cliente."
  IDCLIENTE: string = "";
  accion: string = "N"
  validaCaptura: FormGroup;

  subscription: Subscription;

  estatus: any[] = [
    { IDTIPO: "A", NOMBRE: "ACTIVO" },
    { IDTIPO: "B", NOMBRE: "BAJA" }
  ];

  constructor(private _router: Router,
    private _servicios: ServiciosService,
    private _toastr: ToastrService,
    private confirmBox: NgxConfirmBoxService) { }

  ngOnInit(): void {

    this.IDCLIENTE = localStorage.getItem("IDCTE");
    this.accion = localStorage.getItem("ACCION");

    this.validaCaptura = new FormGroup({
      IDCLIENTE: new FormControl({ value: '', disabled: this.accion == "M" }, [Validators.required]),
      NOMBRE: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      RFC: new FormControl("", [Validators.required, Validators.minLength(12), Validators.maxLength(20)]),
      TELEFONO: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      EMAIL: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(50)]),
      DIASCREDITO: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999), Validators.minLength(0), Validators.maxLength(3)]),
      ESTATUS: new FormControl("A", [Validators.required])
    });

    this._servicios.navbarAcciones({ TITULO: "", AGREGAR: false, BORRAR: this.accion == "M" ? true : false, GUARDAR: true, BUSCAR: false });

    this.subscription = this._servicios.navbarRespIcono$
      .subscribe(resp => {
        if (resp == "GUARDAR") {
          if (this.validaCaptura.invalid)
            this._toastr.error("Falta campos por capturar.", "Clientes")
          else
            this.setCliente();
        }

        if (resp == "BORRAR") 
          this.confirmBox.show();

      });


    if (this.accion == "M") {

      this.titulo = "Modificando cliente."
      let param = { valor: this.IDCLIENTE };

      this._servicios.wsGeneral("getClientes", param)
        .subscribe(x => {

          x.forEach(cte => {
            this.validaCaptura.setValue({
              IDCLIENTE: cte.IDCLIENTE,
              NOMBRE: cte.NOMBRE,
              RFC: cte.RFC,
              EMAIL: cte.EMAIL,
              TELEFONO: cte.TELEFONO,
              DIASCREDITO: cte.DIASCREDITO,
              ESTATUS: cte.ESTATUS
            });
          });
        }, error => this._toastr.error("Error: " + error.message, "Clientes"),
          () => this.validaCaptura.markAllAsTouched());
    }
  }

  setCliente() {
    let ws = "";
    if (this.accion == "M")
      ws = "updCliente";
    else
      ws = "addCliente";

    this._servicios.wsGeneral(ws, this.validaCaptura.getRawValue())
      .subscribe(resp => {
        if (resp.dato == "0") {
          this._toastr.success(resp.valor, "Clientes");
          this.goBack()
        }
        else
          this._toastr.error(resp.valor, "Clientes");
      },
        error => this._toastr.error("Error: " + error.message, "Clientes"));
  }

  clienteEliminarSiNO() {
    this.confirmBox.show();
  }

  clienteDel(showConfirm: boolean): void {

    if (showConfirm) {
      this._servicios.wsGeneral("delCliente", this.validaCaptura.getRawValue())
        .subscribe(x => { },
          error => this._toastr.error("Error: " + error.message, "Clientes"),
          () => {
            this._toastr.success("Registro eliminado OK", "Clientes");
            this.goBack();
          });
    }
  }

  goBack(): void {
    this._router.navigate(['/clientes']);
  }

  ngOnDestroy() {
    localStorage.removeItem("IDCTE");
    localStorage.removeItem("ACCION");
    this._servicios.navbarAcciones({ TITULO: "", AGREGAR: false, BORRAR: false, GUARDAR: false, BUSCAR: false });
    this.subscription.unsubscribe();
  }


  // validacion de campos generales.
  validaCampo(campo: string): boolean {
    return this._servicios.isValidField(this.validaCaptura, campo);
  }

  mensajeErrorCampo(campo: string): string {
    return this._servicios.getErrorMessageField(this.validaCaptura, campo);
  }

}
