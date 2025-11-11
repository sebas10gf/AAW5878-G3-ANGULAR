import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Questionnaries } from '../models/Questionnaries';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;


@Injectable({
  providedIn: 'root',
})
export class Questionnariesservice {
  private url = `${base_url}/Questionnaries`;
  private listaCambio = new Subject<Questionnaries[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Questionnaries[]>(this.url);
  }

  insert(s: Questionnaries) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: Questionnaries[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Questionnaries>(`${this.url}/${id}`);
  }

  update(s: Questionnaries) {
    return this.http.put(`${this.url}`, s, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
