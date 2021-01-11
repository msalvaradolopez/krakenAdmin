import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios.service';
//This is required
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-materialesdet',
  templateUrl: './materialesdet.component.html',
  styleUrls: ['./materialesdet.component.sass']
})
export class MaterialesdetComponent implements OnInit {
  titulo: string = "Agregando material.";
  IDARTICULO: string = "";
  fileContent: string = '';
  accion: string = "N";
  imagen: string = "";
  validaCaptura: FormGroup;

  catEstatus: any[] = [
    { IDTIPO: "A", NOMBRE: "ACTIVO" },
    { IDTIPO: "B", NOMBRE: "BAJA" }
  ];

  catCategorias: any[] = null;

  constructor(private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.IDARTICULO = localStorage.getItem("IDARTICULO");
    this.accion = localStorage.getItem("ACCION");

    this.validaCaptura = new FormGroup({
      IDARTICULO: new FormControl({ value: '', disabled: this.accion == "M" }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      IDCATEGORIA: new FormControl("", [Validators.required]),
      CATALOGO: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      NOMBRE: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      DESCRIPCION: new FormControl("", [Validators.minLength(10), Validators.maxLength(300)]),
      EXISTENCIA: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9999999), Validators.minLength(0), Validators.maxLength(7)]),
      UNIDAD: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      COSTO: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9999999), Validators.minLength(0), Validators.maxLength(7)]),
      ESTATUS: new FormControl("A", [Validators.required]),
      IMAGEN: new FormControl(null, []),
      DIASENTREGA: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999), Validators.minLength(0), Validators.maxLength(3)]),
    });

    this._servicios.wsGeneral("getCategorias", { valor: "0" })
      .subscribe(resp => { this.catCategorias = resp },
        error => this._toastr.error("Error: " + error.message, "Categorías"));

    if (this.accion == "M") {
      this.titulo = "Modificando artículo";

      this._servicios.wsGeneral("getArticuloById", { valor: this.IDARTICULO })
        .subscribe(resp => {
          this.validaCaptura.setValue({
            IDARTICULO: resp.IDARTICULO,
            IDCATEGORIA: resp.IDCATEGORIA,
            CATALOGO: resp.CATALOGO,
            NOMBRE: resp.NOMBRE,
            DESCRIPCION: resp.DESCRIPCION,
            EXISTENCIA: resp.EXISTENCIA,
            UNIDAD: resp.UNIDAD,
            COSTO: resp.COSTO,
            ESTATUS: resp.ESTATUS,
            IMAGEN: resp.IMAGEN,
            DIASENTREGA: resp.DIASENTREGA
          });
          this.imagen = resp.IMAGEN;
        }, error => this._toastr.error("Error: " + error.message, "Material"));
    }
  }

  setMaterial() {
    let ws = "";
    if (this.accion == "M")
      ws = "updArticulo";
    else
      ws = "addArticulo";

    this._servicios.wsGeneral(ws, this.validaCaptura.getRawValue())
      .subscribe(resp => {
        if (resp.dato == "0") {
          this._toastr.success(resp.valor, "Materiales");
          this.goBack()
        }
        else
          this._toastr.error(resp.valor, "Materiales");
      }, error => this._toastr.error("Error: " + error.message, "Material"));
  }

  loadIMG() {
    var input = $("#myInputFile");
    input.replaceWith(input.val('').clone(true));
    $('#myInputFile').click();
  }

  getFile(fileList: FileList): void {
    let _this = this;
    // Cogemos el primer archivo
    var archivo = fileList[0],
      // Creamos la instancia de FileReader
      reader = new FileReader(),
      urlBase64;
    // Os esperábais algo más complicado?
    reader.onload = function () {
      urlBase64 = reader.result;
      // _this.validaCaptura.IMAGEN = urlBase64;
      _this.validaCaptura.controls.IMAGEN.setValue(urlBase64);
      _this.imagen = urlBase64;
      // Hacer lo que se quiera con la url
    }
    reader.readAsDataURL(archivo);
    // need to run CD since file load runs outside of zone
    this._cd.markForCheck();
  }

  //Call this method in the image source, it will sanitize it.
  transform(base64Image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  // validacion de campos generales.
  validaCampo(campo: string): boolean {
    return this._servicios.isValidField(this.validaCaptura, campo);
  }

  mensajeErrorCampo(campo: string): string {
    return this._servicios.getErrorMessageField(this.validaCaptura, campo);
  }

  goBack(): void {
    this._router.navigate(['/materiales']);
  }

  ngOnDestroy() {
    localStorage.removeItem("IDARTICULO");
    localStorage.removeItem("ACCION");
  }
}
