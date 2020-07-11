import { LkpSection } from './../../../Models/addLookups/sections/lkpSection';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiUrl = environment.apiBaseUrl + 'LkpSection';
  constructor(private http:HttpClient) { }

  sectionList():Observable<LkpSection[]>{
    return this.http.get<LkpSection[]>(this.apiUrl,environment.httpOptions);
  }

  GetSection(Id: number):Observable<LkpSection[]>{
    return this.http.get<LkpSection[]>(this.apiUrl+"/GetSection/"+Id,environment.httpOptions);
  }


  
  sectionListBySchool(schoolId: number):Observable<LkpSection[]>{
    return this.http.get<LkpSection[]>(this.apiUrl+"/GetSectionBySchool/"+schoolId,environment.httpOptions);
  }

  sectionBySchoolList(schoolId):Observable<LkpSection[]>{
    return this.http.get<LkpSection[]>(`${this.apiUrl+"/GetSectionBySchool"}/${schoolId}`,environment.httpOptions);
  }


  addSection(model: LkpSection):Observable<LkpSection>{
    console.log(model);
    return this.http.post<LkpSection>(this.apiUrl,model,environment.httpOptions);
  }

  deleteSection(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions)
  }
  updateSection(id:number, model:LkpSection):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }
getSection(id:number):Observable<LkpSection>{
return this.http.get<LkpSection>(`${this.apiUrl}/${id}`,environment.httpOptions);
}

}
