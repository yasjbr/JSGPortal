import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { HttpClient } from '@angular/common/http';
import { lkpClassDivision } from '../../../Models/addLookups/classes/LkpClassDivision';

@Injectable({
  providedIn: 'root'
})
export class ClassDivisionService {
  private apiUrl = environment.apiBaseUrl + 'LkpClass';


  constructor(private http: HttpClient) { }

  getClassDivision(): Observable<lkpClassDivision[]> {
    return this.http.get<lkpClassDivision[]>(`${this.apiUrl}/${'GetAllClassDivisions'}`,  environment.httpOptions);
  }

  getDivisionsByForm(model: any): Observable<lkpClassDivision[]> {
    console.log('model---->',model);
    
    return this.http.post<lkpClassDivision[]>(`${this.apiUrl}/${'GetClassDivisionsByParams'}`, model, environment.httpOptions);
  }
  getDivisionsByClass(id:number):Observable<lkpClassDivision[]>{
    return this.http.get<lkpClassDivision[]>(`${this.apiUrl}/${'GetClassDivisionsByClass'}/${id}`, environment.httpOptions);

  }
  addDivisionforClass(model: lkpClassDivision): Observable<lkpClassDivision> {
    return this.http.post<lkpClassDivision>(`${this.apiUrl}/${'PostClassDivision'}`, model, environment.httpOptions);
  }


  deleteDivision(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl +'/DeleteClassDivision'}/${id}`, environment.httpOptions);
  }

  updateDivision(id: number, model: lkpClassDivision): Observable<void> {
    return this.http.put<void>(`${this.apiUrl+'/DeleteClassDivision'}/${id}`, model, environment.httpOptions);

  }

  getClassDivisionById(id: number) {
    return this.http.get<YearlyCourse>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }
}
