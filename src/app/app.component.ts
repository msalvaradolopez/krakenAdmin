import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from './servicios.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit, AfterViewChecked {
  title = 'krakenAdmin';
  menuSiNo: boolean = false;

  // classMenu: string = "content-wrapper";
  classMenu: string = "";
  ROL: string = "";
  IDUSUARIO: string = "";

  menuItems: any[] = [];
  menu: any[] = [
    { IDMENU: "clientes", NOMBRE: "Clientes", ICONO: "nav-icon fas fa-industry", ROL: "A" },
    { IDMENU: "usuarios", NOMBRE: "Usuarios", ICONO: "nav-icon fas fa-users", ROL: "A" },
    { IDMENU: "categorias", NOMBRE: "Categorías", ICONO: "nav-icon fas fa-layer-group", ROL: "A" },
    { IDMENU: "materiales", NOMBRE: "Materiales", ICONO: "nav-icon fas fa-boxes", ROL: "A" },
    { IDMENU: "listasprecios", NOMBRE: "Lista precios", ICONO: "nav-icon fas fa-list-ol", ROL: "A" },
    { IDMENU: "pedidos", NOMBRE: "Pedidos", ICONO: "nav-icon fas fa-clipboard-list", ROL: "A" },
    { IDMENU: "pedidos", NOMBRE: "Pedidos", ICONO: "nav-icon fas fa-clipboard-list", ROL: "U" },
    { IDMENU: "pedidos", NOMBRE: "Pedidos", ICONO: "nav-icon fas fa-clipboard-list", ROL: "S" },
    { IDMENU: "autorizaciones", NOMBRE: "Autorizaciones", ICONO: "nav-icon fas fa-th", ROL: "A" },
    { IDMENU: "autorizaciones", NOMBRE: "Autorizaciones", ICONO: "nav-icon fas fa-th", ROL: "S" },
    { IDMENU: "login", NOMBRE: "Login", ICONO: "nav-icon fas fa-key", ROL: "A" },
    { IDMENU: "login", NOMBRE: "Login", ICONO: "nav-icon fas fa-key", ROL: "S" },
    { IDMENU: "login", NOMBRE: "Login", ICONO: "nav-icon fas fa-key", ROL: "U" }
  ];

  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    // $.widget.bridge('uibutton', $.ui.button)

    localStorage.clear();

    this._servicios.activarmenu$
      .subscribe(
        accion => {
          this.menuSiNo = accion;
          if (accion) {
            this.ROL = localStorage.getItem("ROL");
            this.menuItems = this.menu.filter(x => x.ROL == this.ROL);
            if (this.ROL == "A")
              this._router.navigate(['/autorizaciones']);
            else if (this.ROL == "S")
              this._router.navigate(['/autorizaciones']);
            else if (this.ROL == "U")
              this._router.navigate(['/pedidos']);
            this.classMenu = "content-wrapper";
          } else
            this.classMenu = "";

          this.IDUSUARIO = localStorage.getItem("IDUSUARIO");
        }
      );
  }

  ngAfterViewChecked() {
    

    /*
    
      */

  }

}
