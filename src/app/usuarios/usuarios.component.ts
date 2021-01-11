import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = null;
  valorBuscar: string = "";
  buscarForm: FormGroup;

  constructor(private _router: Router, private _servicios: ServiciosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuariosGet();

    this.buscarForm = new FormGroup({
      valorBuscar: new FormControl('')
    });

    this.buscarForm.get("valorBuscar").valueChanges.subscribe(
      data => {
        this.valorBuscar = data;
        this.usuariosGet();
      } 
    );
  }

  usuariosGet() {
    let valor = "";
    if (this.valorBuscar == "") 
      valor = "0"
    else 
      valor = this.valorBuscar;

    this._servicios.wsGeneral("getUsuarios", {valor: valor})
      .subscribe(x => {
        this.usuarios = x
        this.usuarios.forEach(item => {
          if (item.ESTATUS == "A")
            item.ESTATUS = "ACTIVO";
          else
            item.ESTATUS = "BAJA";
          
          if (item.ROL == "A")
            item.ROL = "ADMINISTRADOR";
          else if (item.ROL == "S")
            item.ROL = "SUPERVISOR";
          else if (item.ROL == "U")
            item.ROL = "USUARIO";            
        });
      }, error => this._toastr.error("Error: " + error.message, "Usurios")
      );
  }


  usuarioDet(IDUSUARIO: string): void {
    localStorage.setItem("IDUSER", IDUSUARIO);
    localStorage.setItem("ACCION", "M");
    this._router.navigate(['/usuariosdet']);
  }

  usuarioDel(usuario: any): void {

    this._servicios.wsGeneral("delUsuario", usuario)
      .subscribe(x => { },
        error => this._toastr.error("Error: " + error.message, "Usuarios"),
        () => {
          this._toastr.success("Registro eliminado OK", "Usuarios");
          this.usuariosGet();
        }
      );
  }

  usuarioNew(): void {
    localStorage.setItem("IDUSER", "0");
    localStorage.setItem("ACCION", "N");
    this._router.navigate(['/usuariosdet']);
  }


}
