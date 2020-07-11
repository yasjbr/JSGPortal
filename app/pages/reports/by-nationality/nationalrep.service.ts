import { studentNationalData } from './../../../Models/Reg/Reports/studentNationalData';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';

@Injectable({
  providedIn: 'root'
})
export class NationalrepService {
  apiUrl = environment.apiBaseUrl + "RegParent";
  constructor(private http: HttpClient) {}

  
  GetStudByNationality():Observable<studentNationalData[]>{
    return this.http.get<studentNationalData[]>(this.apiUrl+"/GetStudByNationality", environment.httpOptions);
  }

  GetStudNationalitybyfilter(schoolId:number,sectionId:number,classId:number,classDivisionId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl + "/GetStudNationalitybyfilter"}/${schoolId}/${sectionId}/${classId}/${classDivisionId}`, environment.httpOptions);
  }
}
