import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResultService } from 'src/app/services/result.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  searchText: string = '';
  results: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = [
    'rollno',
    'name',
    'math',
    'english',
    'science',
    'total',
    'percentage',
    'actions',
  ];

  constructor(private result: ResultService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getResult();
  }


  getResult() {
    this.result.getResultsService().subscribe((data) => {
      this.results = data.map((element: any) => ({
        id: element.payload.doc.id,
        ...element.payload.doc.data(),
      }));
      this.dataSource = new MatTableDataSource(this.results);
      
      // Move this line here to ensure that the dataSource is defined before setting up paginator and sort
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // applyFilter() {
  //   this.dataSource.filter = this.searchText.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  applyFilter() {
    if (this.dataSource) {
      this.dataSource.filter = this.searchText.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  deleteResult(id: string) {
    if (confirm('You want to delete')) {
      this.result.deleteResultService(id).then(() => {
        console.log('Result deleted successfully');
        this.toastr.error('The Result was deleted successfully', 'Record deleted!', {
          positionClass: 'toast-bottom-right',
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
