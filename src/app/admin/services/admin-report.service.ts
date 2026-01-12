import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminReportService {

  private baseUrl = 'http://localhost:8080/report-service';

  constructor(private http: HttpClient) {}

  downloadFullReport(): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/reports/full`,
      { responseType: 'blob' }
    );
  }
}