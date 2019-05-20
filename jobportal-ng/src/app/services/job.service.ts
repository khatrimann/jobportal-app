import { Observable } from 'rxjs';
import { Job } from './../shared/job';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {

  }

  getJobs(): Observable<any> {
    return this.http.get<any>(baseURL + 'jobs');
  }

  postJob(id: string, body: any): Observable<Job> {
    return this.http.post<Job>(baseURL + 'jobs/' + id + '/job', body);
  }

  applyJob(user_id, job_id: string): Observable<any> {
    return this.http.put<any>(baseURL + 'jobs/' + user_id + '/applied', { 'job_id': job_id });
  }

  getJob(id: string): Observable<any> {
    return this.http.get<any>(baseURL + 'jobs/job/' + id);
  }
}
