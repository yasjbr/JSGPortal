// import { LkpDivision } from './../../../Models/addLookups/Division/lkpDivision';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Admission } from '../../../Models/Admission/admission';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  public sSelected: any;
  public sParentId: string;
  private apiUrl = environment.apiBaseUrl + 'AdmStud';  
  constructor(private http: HttpClient) { }


  getByParentAndSchool(id: string, schoolId): Observable<Admission[]> {
    return this.http.get<Admission[]>(`${this.apiUrl + "/RegChildrensBySchool"}/${id}/${schoolId}`, environment.httpOptions);
  }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  private parentIdParam = new BehaviorSubject('');
  currentParentIdParam = this.parentIdParam.asObservable();
  changeParentId(parentId: string) {
    this.parentIdParam.next(parentId);
  }
  
  
}
