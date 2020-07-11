import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RemanderFeesFilter } from 'src/app/Models/financial/Reports/RemanderFeesFilter';
import { finStudCard } from 'src/app/Models/financial/finStudCard';
import { RemanderFees } from 'src/app/Models/financial/Reports/RemanderFees';

@Injectable({
  providedIn: "root"
})
export class FinReportService {
  private apiUrl = environment.apiBaseUrl + "StudentFee";
  constructor(private http: HttpClient) { }

  GetFinStudCardSummaryReport(filter: RemanderFeesFilter): Observable<finStudCard[]> {
    return this.http.post<finStudCard[]>(
      `${this.apiUrl + "/FinStudCardSummaryReport2"}`, filter,
      environment.httpOptions
    );
  }
}
