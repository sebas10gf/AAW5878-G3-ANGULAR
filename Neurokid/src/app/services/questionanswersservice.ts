import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { QuestionAnswers } from '../models/QuestionAnswers';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class Questionanswersservice {
  private url = `${base_url}/QuestionsAnswers`;

  private listaCambio = new Subject<QuestionAnswers[]>();
    constructor(private http: HttpClient) { }

    list() {
      return this.http.get<QuestionAnswers[]>(this.url);
    }

    insert(qa: QuestionAnswers) {
      return this.http.post(this.url, qa, { responseType: 'text' });
    }

    setList(listaNueva: QuestionAnswers[]) {
      this.listaCambio.next(listaNueva);
    }

    getList() {
      return this.listaCambio.asObservable();
    }

    listId(id:number) {
      return this.http.get<QuestionAnswers>(`${this.url}/${id}`);
    }

    update(qa: QuestionAnswers) {
      return this.http.put(`${this.url}`, qa, { responseType: 'text' });
    }

    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
