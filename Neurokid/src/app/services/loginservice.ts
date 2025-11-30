import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequestDTO } from '../models/JwtRequestDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class loginservice {

  constructor(private http: HttpClient) {}

  login (request:JwtRequestDTO) {
    return this.http.post('http://localhost:8080/login', request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if(!token) {
      return null;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  showName() {
    let token = sessionStorage.getItem('token');
    if(!token) {
      return null;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.nombre;
  }

}
