import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'Hoteles/';
    //this.resourceUrl = 'https://localhost:44349/api/Articulos/';
  }

  get(Nombre: string, Habilitado: boolean) {
    let params = new HttpParams();
    if (Nombre != null) {
      params = params.append('Nombre', Nombre);
    }
    if (Habilitado != null) {
      params = params.append('Habilitado', Habilitado.toString());
    }
    return this.httpClient.get(this.resourceUrl, { params: params });
  }

  post(obj: Hotel) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj: Hotel) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}
