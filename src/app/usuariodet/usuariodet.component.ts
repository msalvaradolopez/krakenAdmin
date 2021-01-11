import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-usuariodet',
  templateUrl: './usuariodet.component.html',
  styleUrls: ['./usuariodet.component.sass']
})
export class UsuariodetComponent implements OnInit {

  validaCaptura: FormGroup;

  titulo: string = "Agregando usuario."
  accion: string = "N";
  IDUSUARIO: string = "";
  catClientes: any[] = null;
  catEstatus: any[] = [
    { IDTIPO: "A", NOMBRE: "ACTIVO" },
    { IDTIPO: "B", NOMBRE: "BAJA" }
  ];

  catRoles: any[] = [
    { IDTIPO: "A", NOMBRE: "ADMINISTRADOR" },
    { IDTIPO: "S", NOMBRE: "SUPERVISOR" },
    { IDTIPO: "U", NOMBRE: "USUARIO" }
  ];

  usuario: any = {
    IDUSUARIO: "",
    IDCLIENTE: "",
    NOMBRE: "",
    EMAIL: "",
    TELEFONO: "",
    ROL: "A",
    PASSW: "",
    IMPORTEMAX: 0.00,
    ESTATUS: "A"
  }


  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {

    this.IDUSUARIO = localStorage.getItem("IDUSER");
    this.accion = localStorage.getItem("ACCION");

    this.validaCaptura = new FormGroup({
      IDUSUARIO: new FormControl({ value: '',  disabled: this.accion == "M" }, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      IDCLIENTE: new FormControl("", [Validators.required]),
      NOMBRE: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      PASSW: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      ROL: new FormControl("", [Validators.required]),
      TELEFONO: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      EMAIL: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(50)]),
      IMPORTEMAX: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9999999), Validators.minLength(0), Validators.maxLength(7)]),
      ESTATUS: new FormControl("A", [Validators.required])
    });

    this._servicios.wsGeneral("getClientes", { valor: "0" })
      .subscribe(x => this.catClientes = x,
        error => this._toastr.error("Error: " + error.message, "Clientes"));

    if (this.accion == "M") {

      this.titulo = "Modificando usuario."

      let param = { valor: this.IDUSUARIO };

      this._servicios.wsGeneral("getUsuarios", param)
        .subscribe(x => {

          x.forEach(usr => {
            this.validaCaptura.setValue({
              IDUSUARIO: usr.IDUSUARIO,
              IDCLIENTE: usr.IDCLIENTE,
              NOMBRE: usr.NOMBRE,
              PASSW: usr.PASSW,
              ROL: usr.ROL,
              TELEFONO: usr.TELEFONO,
              EMAIL: usr.EMAIL,
              IMPORTEMAX: usr.IMPORTEMAX,
              ESTATUS: usr.ESTATUS
            });
          });
        }, error => this._toastr.error("Error: " + error.message, "Usuarios"),
        () => this.validaCaptura.markAllAsTouched());
    }
  }

  setUsuario() {
    let ws = "";
    if (this.accion == "M")
      ws = "updUsuario";
    else
      ws = "addUsuario";

    this._servicios.wsGeneral(ws, this.validaCaptura.getRawValue())
      .subscribe(resp => { 
        if (resp.dato == "0")
        {
          this._toastr.success(resp.valor, "Usuarios");
          this.goBack();
        } else
          this._toastr.error(resp.valor, "Usuarios");
      }, error => this._toastr.error("Error: " + error.message, "Usuarios"));
  }

  // validacion de campos generales.
  validaCampo(campo: string): boolean {
    return this._servicios.isValidField(this.validaCaptura, campo);
  }

  mensajeErrorCampo(campo: string): string {
    return this._servicios.getErrorMessageField(this.validaCaptura, campo);
  }

  goBack(): void {
    this._router.navigate(['/usuarios']);
  }

  ngOnDestroy() {
    localStorage.removeItem("IDUSER");
    localStorage.removeItem("ACCION");
  }
}
