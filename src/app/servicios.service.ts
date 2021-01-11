import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  apiURL: string = environment.apiURL;

  private _navbarRespIcono = new Subject<string>();
  navbarRespIcono$ = this._navbarRespIcono.asObservable();

  private _navbarAciones = new Subject<any>();
  navbarAciones$ = this._navbarAciones.asObservable();

  private _activarmenu = new Subject<boolean>();
  activarmenu$ = this._activarmenu.asObservable();

  private _activarBuscarMaterial= new Subject<boolean>();
  _activarBuscarMaterial$ = this._activarBuscarMaterial.asObservable();


  private _buscarMat = new Subject<string>();
  buscarMat$ = this._buscarMat.asObservable();

  private _alertBox = new Subject<any>();
  alertBox$ = this._alertBox.asObservable();

  private _accionPedidosCuenta = new Subject<any>();
  _accionPedidosCuenta$ = this._accionPedidosCuenta.asObservable();

  constructor(private _http: HttpClient) { }

  navbarRespIcono(resp: string) {
    this._navbarRespIcono.next(resp);
  }

  navbarRespIconoLimpiar() {
    this._navbarRespIcono.next();
  }

  navbarAcciones(navbar: any) {
    this._navbarAciones.next(navbar);
  }

  accionMenu(menuSiNo: boolean ) {
    this._activarmenu.next(menuSiNo);
  }

  activarBuscarMaterial(buscarSiNo: boolean ) {
    this._activarBuscarMaterial.next(buscarSiNo);
  }

  buscarMat(buscar: string) {
    this._buscarMat.next(buscar);
  }

  alertBox(options: any){
    this._alertBox.next(options);
  }

  accionPedidosCuenta(){
    this._accionPedidosCuenta.next();
  }

  wsGeneral(ws: string, param: any): Observable<any> {
    return this._http.post(this.apiURL + "/" + ws, param);
  }

  isValidField(controlGroup: FormGroup ,campo : string): boolean {
    return ((controlGroup.get(campo).touched || controlGroup.get(campo).dirty) && controlGroup.get(campo).invalid);
  }

  getErrorMessageField(control:FormGroup, campo: string): string {
    let mensaje = "";

    if (control.get(campo).errors.required)
      mensaje = "Campo requierido";
    else if (control.get(campo).hasError("pattern"))
      mensaje = "no es un email valido";
    else if (control.get(campo).hasError("minlength")){
      const minlength = control.get(campo).errors?.minlength.requiredLength;
      mensaje = "Minimo :" + minlength + " caracteres.";
    }
    else if (control.get(campo).hasError("maxlength")){
      const maxlength = control.get(campo).errors?.maxlength.requiredLength;
      mensaje = "Máximo :" + maxlength + " caracteres.";
    } else if (control.get(campo).hasError("min")){
      const min = control.get(campo).errors?.min.min;
      mensaje = "Mínimo :" + min + " digitos.";
    } else if (control.get(campo).hasError("max")){
      const max = control.get(campo).errors?.max.max;
      mensaje = "Máximo :" + max + " digitos.";
    } else if (control.get(campo).hasError("email"))
      mensaje = "no es un email valido";

      
    return mensaje;
  }

}
