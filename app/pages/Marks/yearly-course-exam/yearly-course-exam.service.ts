import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YearlyCourseExam } from 'src/app/Models/Marks/YearlyCourseExam';

@Injectable({
  providedIn: 'root'
})
export class YearlyCourseExamService {

  private apiUrl = environment.apiBaseUrl + 'YearlyCourseExam';
  public selectedYearId: any;
  public selectedClassId: any;
  public SelectedSchoolId:any;
  
  constructor(private http: HttpClient) { }

  getYearlyCourseExamList(): Observable<YearlyCourseExam[]> {
    return this.http.get<YearlyCourseExam[]>(this.apiUrl, environment.httpOptions);
  }


  getYearlyCoureExamById(id: number): Observable<YearlyCourseExam> {
    return this.http.get<YearlyCourseExam>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }


  deleteYearlyCourseExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  updateYearlyCourseExam(id: number, entity: YearlyCourseExam): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, entity, environment.httpOptions);
  }


  addYearlyCourseExam(model: YearlyCourseExam): Observable<void> {
    return this.http.post<void>(this.apiUrl, model, environment.httpOptions);
  }

  GetYearlyCourseByYearlyCourseId(id :number):Observable<YearlyCourseExam[]>{
    return this.http.get<YearlyCourseExam[]>(`${this.apiUrl}/${'GetYearlyCourseByYearlyCourseId'}/${id}`,environment.httpOptions);
  }
}
