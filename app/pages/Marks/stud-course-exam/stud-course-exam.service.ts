import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StudCourseExam } from 'src/app/Models/Marks/StudCourseExam';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudCourseExamService {

  private apiUrl = environment.apiBaseUrl + 'StudCourseExam';
  constructor(private http: HttpClient) { }

  getStudCourseExamList(): Observable<StudCourseExam[]> {
    return this.http.get<StudCourseExam[]>(this.apiUrl, environment.httpOptions);
  }

  getStudCourseExamListByParam(model: any): Observable<StudCourseExam[]> {
    return this.http.post<StudCourseExam[]>(`${this.apiUrl}/${'GetStudCourseExamByParam'}`, model, environment.httpOptions);
  }

  deleteStudCourseExam(id: number): Observable<void> {
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  updateStudCourseExam(id: number, entity: StudCourseExam): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, entity, environment.httpOptions);
  }


  addStudCourseExam(model: StudCourseExam): Observable<void> {
    return this.http.post<void>(this.apiUrl, model, environment.httpOptions);
  }
  getStudCoureExamById(id: number): Observable<StudCourseExam> {
    return this.http.get<StudCourseExam>(`${this.apiUrl}/${'GetStudCourseExamById'}/${id}`, environment.httpOptions);
  }

  getStudCoureExamByParam(model:any): Observable<StudCourseExam[]> {
    return this.http.post<StudCourseExam[]>(`${this.apiUrl}/${'GetStudCourseExamByParam'}`, model,environment.httpOptions);
  }



  // getStudCoureExamById1(id: number) :StudCourseExam{
  //   return this.http.get<StudCourseExam>(`${this.apiUrl}/${'GetStudCourseExamById'}/${id}`, environment.httpOptions);
  // }


}
