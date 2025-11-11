import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private url = `${base_url}/Users`;
  private listaCambio = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<User[]>(this.url);
  }

  insert(s: User) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  update(s: User) {
    return this.http.put(`${this.url}`, s, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
