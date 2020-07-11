import { LkpBus } from './../../../Models/addLookups/bus/lkpBus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {


  private apiUrl = environment.apiBaseUrl + 'LkpBus';
  constructor(private http: HttpClient) { }


  busList(): Observable<LkpBus[]> {
    return this.http.get<LkpBus[]>(this.apiUrl, environment.httpOptions);
  }



  GetLKpBusAndSchoolName():Observable<LkpBus[]>{
    return this.http.get<LkpBus[]>(this.apiUrl+"/GetLKpBusAndSchoolName/",environment.httpOptions);
  }


  addBus(model: LkpBus): Observable<LkpBus> {
    console.log(model);
    return this.http.post<LkpBus>(this.apiUrl, model, environment.httpOptions);
  }
  updateSection(id: number, model: LkpBus): Observable<void> {
    console.log('fffff',model);
    
    return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions);
  }

  getBusById(id:number):Observable<LkpBus>{
    return this.http.get<LkpBus>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }
  deleteBus(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions)
  }
}
