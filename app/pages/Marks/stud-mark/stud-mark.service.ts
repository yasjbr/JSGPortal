import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudMark } from 'src/app/Models/Marks/StudMark';

@Injectable({
  providedIn: 'root'
})
export class StudMarkService {
  private apiUrl = environment.apiBaseUrl + 'studmark';


  constructor(private http: HttpClient) { } 

  getStudMarksList(): Observable<StudMark[]> {
    return this.http.get<StudMark[]>(this.apiUrl, environment.httpOptions);
  }

  GetStudMarksByParam(model:any): Observable<StudMark[]> {
    // return this.http.post<StudMark[]>(this.apiUrl,model, environment.httpOptions);
    return this.http.post<StudMark[]>(`${this.apiUrl}/${'GetStudMarkByParam'}`,model,environment.httpOptions);
  }

  GetStudMarksById(id:number): Observable<StudMark[]> {
    // return this.http.post<StudMark[]>(this.apiUrl,model, environment.httpOptions);
    return this.http.get<StudMark[]>(`${this.apiUrl}/${'GetStudMarkById'}/${id}`,environment.httpOptions);
  }

  updateStudMark(id: number, entity: StudMark): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, entity, environment.httpOptions);
  }

}
