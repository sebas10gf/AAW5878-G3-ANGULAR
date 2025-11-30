import { Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Questions } from '../models/Questions';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class Questionsservice {
  private url = `${base_url}/Questions`;

  private listaCambio = new Subject<Questions[]>();

    constructor(private http:HttpClient) {  }

    list() {
      return this.http.get<Questions[]>(this.url);
    }
  
    insert(q: Questions) {
      return this.http.post(this.url, q, {responseType: 'text'});
    }

    setList(listaNueva:Questions[]) {
      this.listaCambio.next(listaNueva);
    }

    getList() {
      return this.listaCambio.asObservable();
    }

    listId(id:number) {
      return this.http.get<Questions>(`${this.url}/${id}`);
    }

    update(q: Questions) {
      return this.http.put(`${this.url}`, q, { responseType: 'text' });
    }

    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }

    search(id: number) {
      const params = {id};
    return this.http.get<Questions[]>(`${this.url}/busquedas`, {params});
  }
}
