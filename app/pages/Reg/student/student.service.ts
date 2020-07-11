
import { regParents } from '../../../Models/Reg/Parents/reg-parents';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from 'src/app/Models/Reg/Students/students';
import { users } from 'src/app/Models/Users/users';





@Injectable({
  providedIn: 'root'
})

export class StudentService {


  public sAddParent=true;

  public sParentId: string;
  public sParentName: string;
  public sSelected: any; 

  //CurrentYear
  public sCurrentYearId: any;
  public sCurrentYear: any;

  apiUrl = environment.apiBaseUrl + 'AdmStud';

  private url = environment.apiBaseUrl + 'Users';
  private RegStudUrl = environment.apiBaseUrl + 'YearlyStudReg';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<users> {
    return this.http.get<users>(this.url, environment.httpOptions);
  }
  getStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, environment.httpOptions);
  }

  addStudent(model: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, model, environment.httpOptions);
  }

  updateStudent(id: number, model: Student): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions);
  }
  deleteStudnt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }


  getParent(id: number): Observable<regParents> {
    return this.http.get<regParents>(`${this.apiUrl + '/Detail'}/${id}`, environment.httpOptions);
  }

  /*
  getStudent(id:number):Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiUrl}/${id}`,environment.httpOptions);
    }
  */

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  getStudentByParam(model: any): Observable<Student[]> {
    return this.http.post<any>(`${this.RegStudUrl}/${'GetStudentsByParam'}`, model, environment.httpOptions);
  }
  
  // Abuhassan 04/12/2019
  GetRegStudentList(schoolId: number, yearId: number, parentId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.RegStudUrl + '/GetRegStudentList'}/${schoolId}/${yearId}/${parentId}`, environment.httpOptions);
  }

}
