import { Component } from '@angular/core';
import { AdminReportService } from '../services/admin-report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})
export class ReportComponent {

  loading = false;

  constructor(private reportService: AdminReportService) {}

  downloadReport() {
    this.loading = true;

    this.reportService.downloadFullReport().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Inventory_Report.pdf';
        a.click();

        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: () => {
        alert('Failed to download report');
        this.loading = false;
      }
    });
  }
}