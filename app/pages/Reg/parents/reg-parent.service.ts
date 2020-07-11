import { regParents } from './../../../Models/Reg/Parents/reg-parents';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parents } from 'src/app/Models/Reg/Parents/parents';




@Injectable({
  providedIn: 'root'
})

export class RegParentService {


  apiUrl = environment.apiBaseUrl + 'RegParent';
// apiUrl2= environment.apiBaseUrl + 'StrVoucherMaster';
  constructor(private http: HttpClient) { }


  getParentsList(): Observable<any> {
    return this.http.get<any>(this.apiUrl, environment.httpOptions);
  }

  
  GetParentByCommitStudentList(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/GetParentByCommitStudent', environment.httpOptions);
  }
  // GetParentByNoDebt():Observable<any>{
  //   return this.http.get<any>(this.apiUrl2+'/GetParentByNoDebt', environment.httpOptions);

  // }

  getParentsByFilter(data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/GetByFilter`, data, environment.httpOptions);
  }



  getParentsList2(): Observable<any> {

    return this.http.get<regParents>(this.apiUrl, environment.httpOptions);
  }

  addParent(model: regParents): Observable<regParents> {
    return this.http.post<regParents>(this.apiUrl, model, environment.httpOptions);
  }

  updateParent(id: number, model: regParents): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions);
  }
  deleteParent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }


  getParent(id: number): Observable<regParents> {
    return this.http.get<regParents>(`${this.apiUrl + "/Detail"}/${id}`, environment.httpOptions);
  }


  getParentById(id: number): Observable<regParents[]> {
    return this.http.get<regParents[]>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }
  GetParentByClass(Classid:number):Observable<regParents[]>{
    return this.http.get<regParents[]>(`${this.apiUrl + "/GetParentByClass" }/${Classid}`, environment.httpOptions);
  }


  GetParentByParentName(ParentName:string):Observable<regParents[]>{
    return this.http.get<regParents[]>(`${this.apiUrl + "/GetParentByParentName" }/${ParentName}`, environment.httpOptions);
  }


}