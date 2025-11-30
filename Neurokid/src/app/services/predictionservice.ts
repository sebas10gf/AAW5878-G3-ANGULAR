import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Prediction } from '../models/Prediction';
import { HttpClient } from '@angular/common/http';
import { PrediccionPromedioDTO } from '../models/PrediccionPromedioDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Predictionservice {
  private url = `${base_url}/Prediction`;

  private listaCambio = new Subject<Prediction[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Prediction[]>(this.url);
  }
  
  insert(p: Prediction) {
    return this.http.post(this.url, p, { responseType: 'text' });
  }

  setList(listaNueva: Prediction[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.http.get<Prediction>(`${this.url}/${id}`);
  }

  update(p: Prediction) {
    return this.http.put(`${this.url}`, p, { responseType: 'text' })
  }

  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }

  getRep3(): Observable<PrediccionPromedioDTO[]> {
    return this.http.get<PrediccionPromedioDTO[]>(`${this.url}/PrediccionPromedio`);
  }
}
