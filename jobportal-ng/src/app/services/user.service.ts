import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCandidate(id): Observable<any> {
    return this.http.get<any>(baseURL + 'users/' + id + '/seeker/profile');
  }

  getRecruiter(id): Observable<any> {
    return this.http.get<any>(baseURL + 'users/' + id + '/provider/profile');
  }
}
