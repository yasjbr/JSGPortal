import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StudCourseMark } from 'src/app/Models/Marks/StudCourseMark';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudCourseMarkService {
  private apiUrl = environment.apiBaseUrl + 'StudCourseMark';

  constructor(private http: HttpClient) { }

  getStudCourseMarkList(): Observable<StudCourseMark[]> {
    return this.http.get<StudCourseMark[]>(this.apiUrl, environment.httpOptions);
  }


  GetStudCourseMarkByParam(model:any):Observable<StudCourseMark[]>{
    return this.http.post<StudCourseMark[]>(`${this.apiUrl}/${'GetStudCourseMarkByParam'}`,model,environment.httpOptions);

  }

}
