import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StoragePackage } from '../../interfaces/storage-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 

  private server = environment.serverUrl;
  public tokenName = environment.tokenName;

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.server}/api/users`, this.tokenHeader());
  }

  getTokenName(): string{
    return this.tokenName;
  }

  getToken():String | null{
    return localStorage.getItem(this.tokenName);
  }

  tokenHeader():{ headers: HttpHeaders }{
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    return { headers }
  }

  getStoragePackages(): Observable<any> {
    return this.http.get(`${this.server}/api/storages`);
  }
  
  constructor(private http: HttpClient) { }
  
  login(table: string, data: object) {
    return this.http.post(this.server + '/api/' + table + '/login/', data);
  }

  registration(table: string, data: object) {
    return this.http.post(this.server + '/api/' + table + '/register', data);
  }

  getSubscriptionByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.server}/api/subscriptions/${userId}`, this.tokenHeader());
  }

  getStorageById(storageId: string): Observable<any> {
    return this.http.get(`${this.server}/api/storages/${storageId}`, this.tokenHeader());
  }

  createStorage(storage: StoragePackage): Observable<any> {
    return this.http.post(`${this.server}/api/storages/create`, storage, this.tokenHeader());
  }
  
  deleteStorage(storageId: string): Observable<any> {
    return this.http.delete(`${this.server}/api/storages/${storageId}`, this.tokenHeader());
  }

  createSubscription(data: object): Observable<any> {
    return this.http.post(`${this.server}/api/subscriptions/create`, data,  this.tokenHeader());
  }

  createDatabase(data: object): Observable<any> {
    return this.http.post(`${this.server}/api/databases/create-database`, data, this.tokenHeader());
  }

  createUser(data: object): Observable<any> {
    return this.http.post(`${this.server}/api/databases/create-user`, data, this.tokenHeader());
  }

  updateDomain(userId: string, data: object): Observable<any> {
    return this.http.patch(`${this.server}/api/users/domain/${userId}`, data, this.tokenHeader());
  }

  grantPrivileges(data: object): Observable<any> {
    return this.http.post(`${this.server}/api/databases/grant-privileges`, data, this.tokenHeader());
  }


}
