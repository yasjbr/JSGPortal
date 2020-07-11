import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Suppliers } from 'src/app/Models/Stock/Suppliers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  apiUrl = environment.apiBaseUrl + "StrSupplier";
  constructor(private http: HttpClient) { }

  GetSupplier(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.apiUrl + "/GetSupplier"}`, environment.httpOptions);

  }
  AddSupplier(model: Suppliers): Observable<Suppliers> {
    console.log(model);
    return this.http.post<Suppliers>(this.apiUrl, model, environment.httpOptions);
  }
  getsupplierbyId(Id: number): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.apiUrl + "/getsupplierbyId"}/${Id}`, environment.httpOptions);
  }
  SupplierUpdate(supplierId:number, model: Suppliers): Observable<void>{
    return this.http.put<void>(`${this.apiUrl }/${supplierId}`, model, environment.httpOptions);
  }
}
