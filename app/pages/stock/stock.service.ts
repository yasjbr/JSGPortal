import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { Items } from 'src/app/Models/Stock/Items';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  apiUrl = environment.apiBaseUrl + "Items";
 paypriceApi = environment.apiBaseUrl + "PayPrice";
  apiUrl3 = environment.apiBaseUrl + "ItemNotRecevid";

  constructor(private http: HttpClient) { }


  getGroupList(classId: number): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.apiUrl + "/GetGroupList"}/${classId}`, environment.httpOptions);

  }
  getItemList(classId: number, GrpId: number): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.apiUrl + "/getItemList"}/${classId}/${GrpId}`, environment.httpOptions);
  }
  AddItem(model: Items): Observable<Items> {
    console.log(model);
    return this.http.post<Items>(this.apiUrl, model, environment.httpOptions);
  }
  getItembyId(Id: number): Observable<Items> {
    return this.http.get<Items>(`${this.apiUrl + "/getItembyId"}/${Id}`, environment.httpOptions);
  }
  getAllItemsList(GrpId: number): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.apiUrl + "/getAllItemList"}/${GrpId}`, environment.httpOptions);
  }

  ItemUpdate(ItemId: number, model: Items): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${ItemId}`, model, environment.httpOptions);
  }

  getItemListByFilter(model): Observable<any> {
    console.log(model);
    return this.http.post<any>(this.apiUrl + "/GetItemListByFilter", model);
  }

  GetItemListForPrice(): Observable<Items[]> {
    return this.http.get<Items[]>(this.apiUrl + "/GetItemListForPrice", environment.httpOptions);
  }
  GetItemPayPrice(ItemId: number): Observable<Items> {
    return this.http.get<Items>(`${this.apiUrl + "/GetItemPayPrice"}/${ItemId}`, environment.httpOptions);
  }
  AddItemPayPrice(model): Observable<any> {
    console.log(model);
    return this.http.post<any>(this.paypriceApi , model);
  }
  GetItembyItemId(ItemId: number): Observable<Items> {
    return this.http.get<Items>(`${this.apiUrl + "/GetItembyItemId"}/${ItemId}`, environment.httpOptions);
  }
  GetbookStatus():Observable<Items[]>{
    return this.http.get<Items[]>(`${this.apiUrl + "/GetbookStatus" }`, environment.httpOptions);
  
  }
  NotReceivedBookbyId(id:number,yearId:number,reason:string):Observable<void>{
    return this.http.put<void>(`${this.apiUrl +  "/NotReceivedBookbyId"}/${id}/${yearId}/${reason}`,environment.httpOptions);
  }

  addItemToAnotherTabel(model: Items): Observable<Items> {
    console.log('model',model ,';;;');
    
    return this.http.post<Items>(this.apiUrl3 + '/NotRecevid', model, environment.httpOptions);
  }

  GetItemNotReceived():Observable<Items[]>{
    return this.http.get<Items[]>(this.apiUrl3+"/GetItemNotReceived", environment.httpOptions);
  }


}
