import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearService {


  private apiUrl = environment.apiBaseUrl +'LkpYear';
  public selectedYearId:any;

  constructor(private http:HttpClient) { }

  getYearsList(){
    return this.http.get<LkpYear[]>(this.apiUrl,environment.httpOptions);
  }

  GetYearList():Observable<LkpYear[]>{
    return this.http.get<LkpYear[]>(this.apiUrl + "/GetYearList", environment.httpOptions);
  }


  ChangeYearByActive(id:number):Observable<void>{
    return this.http.put<void>(`${this.apiUrl +  "/ChangeYearByActive"}/${id}`,environment.httpOptions);
  }


}
