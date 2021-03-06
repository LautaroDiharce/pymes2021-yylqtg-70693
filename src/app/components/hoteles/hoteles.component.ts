import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../../models/hotel';
import { HotelService } from '../../services/hotel.service';
import { ModalDialogService } from '../../services/modal-dialog.service';
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
  FormRegistro: FormGroup;
  submitted = false;
  Hoteles: Hotel[] = null;
  RegistrosTotal: number;
  OpcionesHabilitado = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];
  constructor(
    private hotelService: HotelService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormBusqueda = this.formBuilder.group({
      Nombre: [''],
      Habilitado: [null],
    });
    this.FormRegistro = this.formBuilder.group({
      IdArticulo: [0],
      Nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(55),
        ],
      ],
      MaxPasajeros: [null, [Validators.required, Validators.pattern('[0-9]{1,7}')]],
      FechaAlta: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          ),
        ],
      ],
      Habilitado: [true],
    });
  }

  Volver() {
    this.AccionABMC = 'L';
  }

  Buscar() {
    this.AccionABMC = 'L';
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
  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdArticulo: 0 });
    this.submitted = false;
    //this.FormRegistro.markAsPristine();  // incluido en el reset
    //this.FormRegistro.markAsUntouched(); // incluido en el reset
  }

  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    // agregar post
    if (this.AccionABMC == 'A') {
      this.hotelService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
      // modificar put
      this.hotelService
        .put(itemCopy.IdArticulo, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.Buscar();
        });
    }
  }
}
