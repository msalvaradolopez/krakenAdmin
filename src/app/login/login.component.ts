import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  IDUSUARIO: string = "";
  PASSW: string = "";

  constructor(private _servicios : ServiciosService, 
    private _router: Router,
    private _toastr: ToastrService) { 
    this._servicios.accionMenu(false);
  }

  ngOnInit(): void {
    
  }

  login(){

    if (this.IDUSUARIO == ""){
      this._toastr.error("Se requiere capturar el usuario.", "Login");
      return;
    }

    if (this.PASSW == "") {
      this._toastr.error("Se requiere capturar la contraseña.", "Login");
      return;
    }

    let param: any = {
      IDUSUARIO : this.IDUSUARIO,
      PASSW : this.PASSW
    }
    this._servicios.wsGeneral("getLogin", param)
    .subscribe( res => {
      if (res.ESTATUS == "N") {
        this._toastr.warning("Usuario o constraseña no existen.", "Login");
      } else {
        if (res.ESTATUS == "B") {
          this._toastr.warning("Usuario con estatus de BAJA.", "Login");
        } else {
          if (res.IDLISTA == 0 && (res.ROL == "U" || res.ROL == "S")) {
            this._toastr.warning("Usuario no cuenta con lista de precios asignada.", "Login");
          } else {
            if (res.IMPORTEMAX == 0 && res.ROL == "S") {
              this._toastr.warning("Usuario no cuenta con importe para autorización.", "Login");
            } else {
              let IDLISTA: number = res.IDLISTA;
              let IDCLIENTE: string = res.IDCLIENTE;
              let IDUSUARIO: string = res.IDUSUARIO;
              let IDPEDIDO: number = res.IDREQUI;
              let ROL: string = res.ROL;
  
              localStorage.setItem("IDPEDIDO", IDPEDIDO.toString());
              localStorage.setItem("IDLISTA", IDLISTA.toString());
              localStorage.setItem("IDCLIENTE", IDCLIENTE);
              localStorage.setItem("IDUSUARIO", IDUSUARIO);
              localStorage.setItem("ROL", ROL);
  
              this._servicios.accionMenu(true);
              // this._router.navigate(["home"]);
            }
          }
        }
      }
    }, error => this._toastr.error("Error :" + error.message, "Login"));

    
  }
}
