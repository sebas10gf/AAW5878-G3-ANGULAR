import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LinkedProfile } from '../models/LinkedProfile';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class LinkedProfileservice {
  private url = `${base_url}/LinkedProfile`;
  private listaCambio = new Subject<LinkedProfile[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<LinkedProfile[]>(this.url);
  }

  insert(l: LinkedProfile) {
    return this.http.post(this.url, l,{ responseType: 'text' });
  }

  setList(listaNueva: LinkedProfile[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<LinkedProfile>(`${this.url}/${id}`);
  }

  update(l: LinkedProfile) {
    return this.http.put(`${this.url}`, l, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
