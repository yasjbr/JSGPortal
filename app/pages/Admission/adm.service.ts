import { Admission } from './../../Models/Admission/admission';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { AcdimicYears } from 'src/app/Models/addLookups/years/AcdimicYears';
import { status } from 'src/app/Models/Admission/status';

@Injectable({
  providedIn: 'root'
})
export class AdmService {


  private apiUrl = environment.apiBaseUrl + 'AdmStud';
  private apiUrl2 = environment.apiBaseUrl + 'YearlyStudReg';
  
  private CurrentYearApiUrl = environment.apiBaseUrl + 'LkpYear';

  public sParentId: string;
  public sParentName: string;
  public sSelected: any;

 
  //CurrentYear
  public sCurrentYearId: any;
  public sCurrentYear: any;

  dialogData: any;

  constructor(private http: HttpClient) { }


  admissionList(): Observable<Admission[]> {
    return this.http.get<Admission[]>(this.apiUrl, environment.httpOptions);
  }

  // getRegChildrens(id:string):Observable<regParents[]>{
  //   return this.http.get<regParents[]>(`${this.apiUrl+"/RegChildrens"}/${id}`,environment.httpOptions);
  // }

  admInsert(model: Admission): Observable<void> {
    return this.http.post<void>(this.apiUrl, model, environment.httpOptions);
  }
  admUpdate(id: number, model: Admission): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions)
  }
  admDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl+ "/DeleteUser"}/${id}`, environment.httpOptions);
  }
  getStud(id: number): Observable<Admission> {
    return this.http.get<Admission>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }


  getStudParent(id: string): Observable<regParents> {
    return this.http.get<regParents>(`${this.apiUrl + "/ParentName"}/${id}`, environment.httpOptions);
  }

  getByParent(id: string): Observable<Admission[]> {
    return this.http.get<Admission[]>(`${this.apiUrl + "/RegChildrens"}/${id}`, environment.httpOptions);
  }

  GetCommitedStudents(parentId: string): Observable<Admission[]> {
    return this.http.get<Admission[]>(`${this.apiUrl + "/GetCommitedStudents"}/${parentId}`, environment.httpOptions);
  }

  getByParentAndSchool(id: string, schoolId): Observable<Admission[]> {
  
 
    return this.http.get<Admission[]>(`${this.apiUrl + "/RegChildrensBySchool"}/${id}/${schoolId}`, environment.httpOptions);
  }
  getdataByParentAndSchool(id: string, schoolId): Observable<any> {
    console.log(id,'schooool',schoolId);
    
       return this.http.get<any>(`${this.apiUrl + "/GetdatabyParentandSchool"}/${id}/${schoolId}`, environment.httpOptions);
     }
  getCurrentYear(): Observable<AcdimicYears> {
    return this.http.get<AcdimicYears>(`${this.CurrentYearApiUrl + "/CurrentYear"}`, environment.httpOptions);
  }
  calcDescount(id: string): Observable<Admission[]> {
    return this.http.get<Admission[]>(`${this.apiUrl + "/UpdateStudSeq"}/${id}`, environment.httpOptions);
  }

  GetStatus():Observable<status[]>{
    return this.http.get<status[]>(`${this.apiUrl + "/GetStatus" }`, environment.httpOptions);
  
  }
  GetStudStatus(id:number ,schoolId:number, ParentId:number ,ClassId:number,SectionId:number):Observable<Admission[]>{
    return this.http.get<Admission[]>(`${this.apiUrl + "/GetStudStatus" }/${id}/${schoolId}/${ParentId} /${ClassId}/${SectionId}`, environment.httpOptions);
  }


  GetStudSClassSeq():Observable<Admission[]>{
    return this.http.get<Admission[]>(this.apiUrl + "/GetStudClassSeq", environment.httpOptions);
  }

  GetStudClassSeqbyId(studId:number):Observable<Admission[]>{
    return this.http.get<Admission[]>(`${this.apiUrl + "/GetStudClassSeqbyId"}/${studId}`, environment.httpOptions);
  }

  WithdrowStudentbyId(id:number,yearId:number,reason:string):Observable<void>{
    return this.http.put<void>(`${this.apiUrl2 +  "/WithdrowStudentbyId"}/${id}/${yearId}/${reason}`,environment.httpOptions);
  }
  // WithdrowStudentbyId2(id:number,yearId:number,reason:string):Observable<void>{
  //   return this.http.put<void>(`${this.apiUrl +  "/WithdrowStudentbyId2"}/${id}/${yearId}/${reason}`,environment.httpOptions);
  // }
  setNewClassSeq(studId:number,classId:number,newClassSeqID:number):Observable<void>{
    return this.http.put<void>(`${this.apiUrl2 +"/setNewClassSeq"}/${studId}/${classId}/${newClassSeqID}`,environment.httpOptions);
  }


//setNewTour
setNewTour(studYearlyId:number,model:Admission):Observable<void>{
  console.log('moddel',model);
  return this.http.put<void>(`${this.apiUrl2 +"/setNewTour"}/${studYearlyId}`, model, environment.httpOptions);

}

  GetStudentByParentandSchool(schoolId:number,ParentId:number):Observable<Admission[]>{
    return this.http.get<Admission[]>(`${this.apiUrl + "/GetStudentByParentandSchool" }/${schoolId}/${ParentId}`, environment.httpOptions);

  }
  GetStudTourdetail(studentId:number):Observable<Admission>{
    return this.http.get<Admission>(`${this.apiUrl2 + "/GetStudTourdetail" }/${studentId}`, environment.httpOptions);

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

  addIssue(issue: regParents): void {
    this.dialogData = issue;
  }

  GetStudentByStudentName(StudentName:string):Observable<Admission[]>{
    return this.http.get<Admission[]>(`${this.apiUrl + "/GetStudentByStudentName" }/${StudentName}`, environment.httpOptions);
  }

}
