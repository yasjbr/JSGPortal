
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { users } from 'src/app/Models/Users/users';
import { Observable } from 'rxjs';
import { userReport } from 'src/app/Models/Users/UserRepor';

@Injectable({
    providedIn: 'root' 
  })

  export class userRoleService {

    private url = environment.apiBaseUrl + "UserRole";

    //apiUrl= environment.apiBaseUrl+"AdmStud";

    constructor(public http:HttpClient) { }
    
    addUser(user:users){	    
        return this.http.post(this.url, user, environment.httpOptions);
    }
    
    addsysUser(user:users){	    
        return this.http.post(this.url, user, environment.httpOptions);
    }

    addsysRole(user:any){	    
        return this.http.post(`${this.url}/SysRoles`, user, environment.httpOptions);
    }
    getUserById(id: number){	    
        return this.http.get(`${this.url}/${id}`, environment.httpOptions);
    }

    updateUser(id: number, user:users){
        return this.http.put(`${this.url}/${id}`, user, environment.httpOptions);
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.url}/${id}`, environment.httpOptions);
    }     
     
    getRoleList():Observable<users[]>{	    
        return this.http.get<users[]>(this.url+"/Roles", environment.httpOptions);
    }
     getSysForms(id:number):Observable<users[]>{
        return this.http.get<users[]>(`${this.url+"/GetSysFormsbyRole"}/${id}`, environment.httpOptions);
    }
    getScreenList(id:number):Observable<users[]>{
        return this.http.get<users[]>(`${this.url+"/GetallScreen"}/${id}`, environment.httpOptions);
    }


    deleteScreen(id: number) {
        return this.http.delete(`${this.url + "/DeleteScreen"}/${id}`, environment.httpOptions);
    } 
    AddScreen(model:users):Observable<users>{
        console.log(model);
        return this.http.post<users>(`${this.url+"/AddScreen" }`,model, environment.httpOptions);
    }
  


    //USer Reports
    GetAllUserUnGivenReports(userId:number){
        return this.http.get<userReport[]>(`${this.url+"/GetAllUserUnGivenReports"}/${userId}`, environment.httpOptions);

    }

    GetAllUserGivenReports(userId:number){
        return this.http.get<userReport[]>(`${this.url+"/GetAllUserGivenReports"}/${userId}`, environment.httpOptions);

    }


    DeleteUserReport(id: number) {
        return this.http.delete(`${this.url + "/DeleteUserReport"}/${id}`, environment.httpOptions);
    } 

    AddUserReport(model:userReport){
        console.log(model);
        return this.http.post<userReport>(`${this.url+"/AddUserReport" }`,model, environment.httpOptions);
    }
  

   
  }