// dashboard.component.ts
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  searchText: string = '';
  results: any[] = [];

  constructor(private result: ResultService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() {
    this.result.getResultsService().subscribe(data => {
      this.results = [];
      data.forEach((element: any) => {
        this.results.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.results);
    });
  }

  deleteResult(id: string) {
    if(confirm('You want to delete')){
      this.result.deleteResultService(id).then(() => {
        console.log('Result deleted successfully');
        this.toastr.error('The Result was deleted successfully', 'Record deleted!', {
          positionClass: 'toast-bottom-right'
        });
      }).catch(error => {
        console.log(error);
      });
    }
    
  }

  addResult(result: any) {
    this.result.addResultService(result).then(() => {
      console.log('Result added successfully');
      this.toastr.success('The Result was added successfully', 'Record added!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
      this.toastr.error('Result with the same roll number already exists', 'Error!', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
}
