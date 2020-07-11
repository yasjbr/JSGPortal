import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/Models/financial/payment';
import { Observable, BehaviorSubject } from 'rxjs';
import { finStudCard } from 'src/app/Models/financial/finStudCard';
import { StudentFee } from 'src/app/Models/financial/student-fee';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public sParentId: any;
  public sParentName: any;
  public sYearId: any;
  public orignalCopy: any;



  private apiUrl = environment.apiBaseUrl + "StudentFee";
  private apiUrl2 = environment.apiBaseUrl + "FinItem";

  // public selectedParentId:any;
  public selectedYearId: any;
  constructor(private http: HttpClient) { }

  getStudentFeeList(): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(this.apiUrl, environment.httpOptions);
  }

  GetStudFeesListByParent(yearId, id: number): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(
      `${this.apiUrl + "/GetStudFeesListByParent"}/${yearId}/${id}`,
      environment.httpOptions
    );
  }

  GetStudFeesDtl(yearId, studId): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(
      `${this.apiUrl + "/GetStudFeesDtl"}/${yearId}/${studId}`,
      environment.httpOptions
    );
  }

  GetPaymentList(yearId, studId): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(
      `${this.apiUrl + "/GetPaymentList"}/${yearId}/${studId}`,
      environment.httpOptions
    );
  }

  addStudentFee(model: StudentFee): Observable<StudentFee> {
    return this.http.post<StudentFee>(
      this.apiUrl,
      model,
      environment.httpOptions
    );
  }

  deleteStudentFee(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      environment.httpOptions
    );
  }

  updateStudentFee(id: number, model: StudentFee): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      model,
      environment.httpOptions
    );
  }


  getStudentFeeById(id: number): Observable<StudentFee> {
    return this.http.get<StudentFee>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  FinStdCard(yearId: number, parentId: number): Observable<finStudCard[]> {
    return this.http.get<finStudCard[]>(
      `${this.apiUrl + "/FinStudCard"}/${yearId}/${parentId}`,
      environment.httpOptions
    );
  }
  FinStudCardByStud(yearId: number, studId: number): Observable<finStudCard[]> {
    return this.http.get<finStudCard[]>(
      `${this.apiUrl + "/FinStudCardByStud"}/${yearId}/${studId}`,
      environment.httpOptions
    );
  }

  getErrforFinDept(parentId:number) {
    
    return this.http.get(`${this.apiUrl2 + "/GetParenthasDebit"}/${parentId}` ,{responseType: 'text'});
  }
getPreviousDebts(parentId:number,yearId:number):Observable<finStudCard[]>{
  return this.http.get<finStudCard[]>(`${this.apiUrl2 + "/GetPreviousDebts"}/${parentId}/${yearId}`,
  environment.httpOptions);
}

}
