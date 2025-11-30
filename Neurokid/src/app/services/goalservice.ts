import { Injectable } from '@angular/core';
import { Goal } from '../models/Goal';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Goalservice {
  private url = `${base_url}/Goal`;
  private listaCambio = new Subject<Goal[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Goal[]>(this.url);
  }

  insert(g: Goal) {
    return this.http.post(this.url, g,{ responseType: 'text' });
  }

  setList(listaNueva: Goal[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Goal>(`${this.url}/${id}`);
  }

  update(g: Goal) {
    return this.http.put(`${this.url}`, g, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
