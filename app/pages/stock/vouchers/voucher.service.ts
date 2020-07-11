import { InVoucherDtl } from './../../../Models/Stock/inVoucherDtl';
import { Suppliers } from './../../../Models/Stock/Suppliers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { coustmservice } from '../../reports/coustomer-voucher-Rep/coustomer-voucher-rep/coustmservice';
import { StudentFeeFilter } from 'src/app/Models/financial/student-Fee-Filter';
import { PayWithoutReceiving } from '../../reports/pay-with-out-receiving-books/PayWithoutReceiving';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  apiUrl = environment.apiBaseUrl + "StrSupplier";
  apiUrlVoucher = environment.apiBaseUrl + "StrVoucherMaster";
  constructor(private http: HttpClient) { }

  getSupplierList() {
    return this.http.get<Suppliers[]>(this.apiUrl, environment.httpOptions);
  }

  getInVouchersList(schoolId: number, yearId: number, sourceTypeId: number, sourceId: number) {
    return this.http.get<InVoucherDtl[]>(`${this.apiUrlVoucher + "/GetVouchersListBySup"}/${schoolId}/${yearId}/${sourceTypeId}/${sourceId}`);
  }

  AddItems(model: any): Observable<any> {
    console.log(model);
    try {
      return this.http.post<any>(this.apiUrlVoucher, model, environment.httpOptions);
    }
    catch (exception) { }
  }


  getBooksList(xmodel: any, ClassId: number): Observable<any[]> {
    console.log("-*-")
    console.log(xmodel);
    console.log("-*-*-")
    return this.http.post<any[]>(`${this.apiUrlVoucher}/${"GetBooksList"}/${ClassId}`, xmodel, environment.httpOptions);
  }
  getStudBooksList(model: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrlVoucher}/${"GetBooksList"}`, model, environment.httpOptions);
  }

  GetVoucherById(voucherID: number): Observable<InVoucherDtl[]> {
    return this.http.get<InVoucherDtl[]>(`${this.apiUrlVoucher + "/GetVoucherById"}/${voucherID}`);
  }



  //   GetCustmVoucherbyparentname(parentId: number, yearId: number):Observable<coustmservice[]> {
  //     return this.http.get<coustmservice[]>(`${this.apiUrlVoucher+"/GetCustmVoucherbyparentname"}/${parentId}/${yearId}`);
  // }


  GetCustmVoucherbyparentname(parentId: number, yearId: number): Observable<coustmservice[]> {
    return this.http.get<coustmservice[]>(`${this.apiUrlVoucher + "/GetCustmVoucherbyparentname"}/${parentId}/${yearId}`);

  }

  GetSeelingVoucherById(voucherID: number): Observable<InVoucherDtl[]> {
    return this.http.get<InVoucherDtl[]>(`${this.apiUrlVoucher + "/GetSeelVoucherById"}/${voucherID}`);
  }
  GetSeelingVoucherById2(voucherID: number): Observable<InVoucherDtl[]> {
    return this.http.get<InVoucherDtl[]>(`${this.apiUrlVoucher + "/GetSeelVoucherById2"}/${voucherID}`);
  }
  GetCustmVoucherbyyears(voucherDate): Observable<StudentFeeFilter[]> {
    return this.http.get<StudentFeeFilter[]>(`${this.apiUrlVoucher + "/GetCustmVoucherbyyears"}/${voucherDate}`);


  }
  getTotalString(Total: any) {
    console.log('Totl', Total);
    return this.http.get(`${this.apiUrlVoucher + "/getTotal"}/${Total}`, { responseType: 'text' });
  }

  GetVoucherBySupplier(SourceId, voucherDateFrom, voucherDateTo): Observable<coustmservice[]> {
    if (voucherDateFrom == null || voucherDateTo == null) {
      return this.http.get<coustmservice[]>(`${this.apiUrlVoucher + "/GetVoucherBySupplier"}/${SourceId}`);
    }
    return this.http.get<coustmservice[]>(`${this.apiUrlVoucher + "/GetVoucherBySupplier"}/${SourceId}/${voucherDateFrom}/${voucherDateTo}`);

  }

  returnedVoucher(voucherId: any): Observable<void> {
    //console.log('iddddd',id);

    return this.http.put<void>(`${this.apiUrlVoucher + "/returnedVoucher"}/${voucherId}`, environment.httpOptions);
  }

  GetVoucherStatus(): Observable<coustmservice[]> {
    return this.http.get<coustmservice[]>(`${this.apiUrlVoucher + "/GetVoucherStatus"}`, environment.httpOptions);

  }


  GetPayWithOutReceivingBooks(): Observable<PayWithoutReceiving[]> {
    return this.http.get<PayWithoutReceiving[]>(`${this.apiUrlVoucher + "/GetPayWithOutReceivingBooks"}`, environment.httpOptions);

  }


}
