import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Symptomslog } from '../models/SymptomsLog';
import { HttpClient } from '@angular/common/http';
import { CumplimientoRegistroSintomasDTO } from '../models/CumplimientoRegistroSintomasDTO';
import { environment } from '../../environments/environment';


const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Symptomslogservice {
  private url = `${base_url}/SymptomsLog`;
  private listaCambio = new Subject<Symptomslog[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Symptomslog[]>(this.url);
  }

  insert(s: Symptomslog) {
    return this.http.post(this.url, s,{ responseType: 'text' });
  }

  setList(listaNueva: Symptomslog[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Symptomslog>(`${this.url}/${id}`);
  }

  update(s: Symptomslog) {
    return this.http.put(`${this.url}`, s, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getRep4(): Observable<CumplimientoRegistroSintomasDTO[]> {
      return this.http.get<CumplimientoRegistroSintomasDTO[]>(`${this.url}/CumplimientoRegistroSintomas`);
  }
}
