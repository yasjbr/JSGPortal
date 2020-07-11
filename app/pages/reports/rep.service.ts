import { Admission } from '../../Models/Admission/admission';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { AcdimicYears } from 'src/app/Models/addLookups/years/AcdimicYears';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';
import { ReportsNames } from 'src/app/Models/Reports/ReportsNames';
import { PayPrice } from 'src/app/Models/PayPrice/PayPrice';


@Injectable({
  providedIn: 'root'
})
export class RepService {

  public sParentId;
  apiUrl = environment.apiBaseUrl + "RegStud";
  RepApiUrl = environment.apiBaseUrl + "ReportsNames";
  apiUrl2 = environment.apiBaseUrl + "PayPrice";

  public sRepId;
  public sClassId;
  public sSectionId;

  constructor(private http: HttpClient) { }




  getStudCardDataVw(yearId, id): Observable<StudCardData> {

    console.log('yearId yearId yearId' + yearId);
    
    return this.http.get<StudCardData>(`${this.apiUrl + "/StudCard"}/${yearId}/${id}`, environment.httpOptions);
  }


  GetClassStudents(yearId, classId): Observable<StudCardData[]> {
    return this.http.get<StudCardData[]>(`${this.apiUrl + "/GetClassStudents"}/${yearId}/${classId}`, environment.httpOptions);
  }
  GetStudCountBySection(SchoolId, YearId): Observable<StudCardData[]> {
    return this.http.get<StudCardData[]>(`${this.apiUrl + "/GetStudCountBySection"}/${SchoolId}/${YearId}`, environment.httpOptions);
  }


  GetStudByBus(ClassId, ClassSeqId): Observable<StudCardData[]> {
    return this.http.get<StudCardData[]>(`${this.apiUrl + "/GetStudByBus"}/${ClassId}/${ClassSeqId}`, environment.httpOptions);

  }

  GetReportsList(programId: number): Observable<ReportsNames[]> {
    return this.http.get<ReportsNames[]>(this.RepApiUrl + "/" + programId, environment.httpOptions);
  }


  GetReportsListByUser(programId: number,userId:number): Observable<ReportsNames[]> {
    // return this.http.get<ReportsNames[]>(this.RepApiUrl + "/" + programId, environment.httpOptions);
    return this.http.get<ReportsNames[]>(`${this.RepApiUrl}/${programId}/${userId}`, environment.httpOptions);
  }


  getPayPrice(): Observable<PayPrice[]> {
    return this.http.get<PayPrice[]>(this.apiUrl2 + "/GetPayPrice", environment.httpOptions);

  }
}
