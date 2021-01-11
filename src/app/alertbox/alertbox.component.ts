import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
declare var $:any;

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.sass']
})
export class AlertboxComponent implements OnInit {

  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {
    $('.toast').toast('show');
    this._servicios.alertBox$
    .subscribe( x => { 
      $(".toast").toast('show');
    });
  }

}
