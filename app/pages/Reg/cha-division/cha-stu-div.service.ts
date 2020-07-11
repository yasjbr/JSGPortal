import { StudCardData } from './../../../Models/Reg/Reports/StudCardData';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChaStuDivService {

  public sParentId;
  public sDivisionId;
  apiUrl = environment.apiBaseUrl + "RegStud";
  constructor(private http: HttpClient) { }
  


   





}
