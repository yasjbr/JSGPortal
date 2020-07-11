import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Teacher } from 'src/app/Models/CorseTeacher/Teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorsesTeacherServiceService {
  private apiUrl = environment.apiBaseUrl + "corseDivisionTeacher";
  constructor(private http: HttpClient) { }


  listCorseTeacher(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl +"/GetAllCourseTeacher", environment.httpOptions);
  }

  getTeacherCoursebyId(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`,environment.httpOptions);
  }
  updateTeacher(id:number,model:Teacher[]): Observable<Teacher[]>{
    try {
      return this.http.put<Teacher[]>(this.apiUrl + "/updateCourseTeacher", model, environment.httpOptions);
    }
    catch (exception) { }
  }
  addCourseTeacher(model: Teacher[]): Observable<Teacher[]> {
    console.log(model);
    try {
      return this.http.post<Teacher[]>(this.apiUrl + "/addCourseTeacher", model, environment.httpOptions);
    }
    catch (exception) { }
  }

}
