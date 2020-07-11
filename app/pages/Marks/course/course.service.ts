import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/Models/Marks/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiBaseUrl + 'Course';


  constructor(private http: HttpClient) { }

  getCourseList(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, environment.httpOptions);
  }

  addCourse(model: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, model, environment.httpOptions);
  }

  updateCourse(id: number, model: Course): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }
}
