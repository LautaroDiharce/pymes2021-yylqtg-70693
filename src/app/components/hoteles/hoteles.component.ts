import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hotel } from '../../models/hotel';
import { HotelService } from '../../services/hotel.service';
@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css'],
})
export class HotelesComponent implements OnInit {
  Titulo = 'Hoteles';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC = 'L';
  FormBusqueda: FormGroup;
  Hoteles: Hotel[] = null;
  RegistrosTotal: number;
  OpcionesHabilitado = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];
  constructor(
    private hotelService: HotelService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.FormBusqueda = this.formBuilder.group({
      Nombre: [''],
      Habilitado: [null],
    });
  }

  Buscar() {
    this.hotelService
      .get(this.FormBusqueda.value.Nombre, this.FormBusqueda.value.Habilitado)
      .subscribe((res: any) => {
        this.Hoteles = res;
        this.RegistrosTotal = res.RegistrosTotal;
        //console.log(this.Hoteles);
      });
    //console.log(this.Hoteles);
    //console.log(this.RegistrosTotal.toString());
  }
}
