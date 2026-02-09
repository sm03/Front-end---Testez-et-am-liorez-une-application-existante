import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  register(user: Register): Observable<Object> {
    return this.httpClient.post('/api/register', user);
  }

  login(user: Login): Observable<Object> {
    let params = new HttpParams();
    params = params.append('login', user.login);
    params = params.append('password', user.password);
    return this.httpClient.post('/api/login', null, { params });  
  }

}
