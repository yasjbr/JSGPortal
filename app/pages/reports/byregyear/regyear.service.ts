import { studentyear } from './../../../Models/Reg/Reports/studentyear';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegyearService {
  apiUrl = environment.apiBaseUrl + "YearlyStudReg";
  constructor(private http: HttpClient) { }




  GetNewStudent():Observable<studentyear[]>{
    return this.http.get<studentyear[]>(this.apiUrl+"/GetNewStudent", environment.httpOptions);

  }
}
