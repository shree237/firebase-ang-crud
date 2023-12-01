// search-result.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  name: string = '';
  rollno: string = '';
  errorMessage: string = '';
  data:any = '';

  constructor(private router: Router, private result : ResultService) { }

  getResult(): void {
    // Basic validation for name and rollNo
    if (!this.name || !this.rollno) {
      this.errorMessage = 'Please enter both name and roll number.';
      return;
    }

    // Fetch result data based on name and roll number
    this.result.getResultByNameAndRollNoService(this.name, this.rollno).subscribe((resultData: any) => {
     
      const documentChange = resultData[0];
       this.data = documentChange.payload.doc.data();
       this.data.passed = this.data.percentage >= 35;
      console.log(this.data);
      
      
    });
  }

  printResult(): void {
    document.body.classList.add('print-mode');
    window.print();
    document.body.classList.remove('print-mode');
  }
}
