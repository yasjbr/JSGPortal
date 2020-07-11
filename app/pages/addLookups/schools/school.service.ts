import { LkpSchool } from './../../../Models/addLookups/schools/lkpSchool';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { MatDialog } from '@angular/material';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private apiUrl = environment.apiBaseUrl + 'LkpSchool';
  private cityApiUrl = environment.apiBaseUrl + 'LkpLookup';
  private currentUserSchoolId: number;
  private schpoolParam: number = 0
  currentUser: users;

  constructor(private http: HttpClient,
    private dialog: MatDialog,
    private currentUserService: CurrentUserService
  ) {
    // this.currentUser: users;
    this.currentUserService.user.subscribe(user => this.currentUser = user);
    this.currentUserSchoolId = this.currentUser.schoolId;

    // console.log(this.currentUser.isSuperAdmin+'-----------------------currentUser.isSuperAdmin');


  }

  /// izz:Q: can return cites only rather than all lookups.

  cityList(): Observable<Lkplookup> {
    return this.http.get<Lkplookup>(this.cityApiUrl, environment.httpOptions);
  }
  getCityList(): Observable<Lkplookup> {
    return this.http.get<Lkplookup>(this.cityApiUrl + "/Getcity", environment.httpOptions);
  }

  schoolList(): Observable<LkpSchool[]> {
    // return this.http.get<LkpSchool[]>(this.apiUrl, environment.httpOptions);
    // return this.http.get<LkpSchool[]>(`${this.apiUrl}/${this.schpoolParam}`, environment.httpOptions);

    console.log(this.schpoolParam + '----------------------- 1   school param');
    console.log(this.currentUser.isSuperAdmin + '-----------------------currentUser.isSuperAdmin');

    if (this.currentUser.isSuperAdmin == "False" || this.currentUser.isSuperAdmin == "Null") {

      console.log(this.currentUser.isSuperAdmin + '----------------------- 2   currentUser.isSuperAdmin');
      this.schpoolParam = this.currentUserSchoolId;

    }
    else {
      this.schpoolParam = 0;
    }

    console.log(this.schpoolParam + '-----------------------3    school param');

    return this.http.get<LkpSchool[]>(`${this.apiUrl}/GetByUserType/${this.schpoolParam}`, environment.httpOptions);

  }

  addSchool(model: LkpSchool): Observable<LkpSchool> {
    return this.http.post<LkpSchool>(this.apiUrl, model, environment.httpOptions);
  }
  deleteSchool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  updateSchool(id: number, model: LkpSchool): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions);
  }
  getSchool(id: number): Observable<LkpSchool> {
    return this.http.get<LkpSchool>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  uploadImage(id: number, file: File = null) {
    const data = new FormData();
    // data.append('id', id.toString());
    data.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/UploadImage/${id}`, data, environment.httpOptions);
  }

}
