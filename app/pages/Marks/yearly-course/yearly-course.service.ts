import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YearlyCourseService {
  private apiUrl = environment.apiBaseUrl + 'YearlyCourse';
  public selectedYearId: any;
  public selectedClassId: any;
  public SelectedSchoolId:any;

  constructor(private http: HttpClient) { }

  getYearlyCourseList(): Observable<YearlyCourse[]> {
    return this.http.get<YearlyCourse[]>(this.apiUrl, environment.httpOptions);
  }

  getYearlyCourseByParam(model: any): Observable<YearlyCourse[]> {
    return this.http.post<YearlyCourse[]>(`${this.apiUrl}/${'GetYearlyCourseByParam2'}`, model, environment.httpOptions);
  }

  addYearlyCourse(model: YearlyCourse): Observable<YearlyCourse> {
    return this.http.post<YearlyCourse>(this.apiUrl, model, environment.httpOptions);
  }


  deleteYearlyCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  updateYearlyCourse(id: number, model: YearlyCourse): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions);
  }

  getYearlyCourseById(id: number) {
    return this.http.get<YearlyCourse>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }
}
