import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { employee } from 'src/app/Models/Employee/employee';
import { employeeMaster, employeeDtl } from 'src/app/Models/Employee/employeeMaster';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public sParentId;
  public selectedSpecId:any;
  apiUrl = environment.apiBaseUrl + "Employee";
  apiUrlMaster=environment.apiBaseUrl + "EmployeeMaster";
  apiUrlDtl=environment.apiBaseUrl + "EmployeeDtl";
  

  constructor(private http: HttpClient) {

 }
 GetAllEmployee(schoolId:number): Observable<employee[]> {
    return this.http.get<employee[]>(`${this.apiUrl + "/GetAllEmployee"}/${schoolId}`, environment.httpOptions);
  }
  AddItems(model: employeeMaster[]): Observable<employeeMaster[]> {
    console.log(model);
    try {
      return this.http.post<employeeMaster[]>(this.apiUrlMaster, model, environment.httpOptions);
    }
    catch (exception) { }
  }
  GetEmployeeByBorrow(employeeId,itemId,statusId):Observable<employeeDtl[]>{
    return this.http.get<employeeDtl[]>(`${this.apiUrlDtl + "/GetEmployeeByBarrow"}/${employeeId}/${itemId}/${statusId}`, environment.httpOptions);

  }
  returnBook(id):Observable<void>{
    return this.http.put<void>(`${this.apiUrlDtl + "/returnBook"}/${id}`, environment.httpOptions);

  }

  Addemployee(model: employee): Observable<employee> {
    return this.http.post<employee>(this.apiUrl+"/Save", model, environment.httpOptions);
  }

  employeeUpdate(Id:number, model: employee): Observable<void>{
    return this.http.put<void>(`${this.apiUrl }/${Id}`, model, environment.httpOptions);
  }


  getEmployeeById(Id: number): Observable<employee[]> {
    return this.http.get<employee[]>(`${this.apiUrl + "/getEmployeeById"}/${Id}`, environment.httpOptions);
  }

  

  


}
