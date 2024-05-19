import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StudentData } from '../model/student';
import { GooglechartService } from '../services/googlechart.service';

declare var google: any; 

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  data: StudentData[] = []; // Your Firestore data
  passCount: number = 0;
  failCount: number = 0;

  constructor(
    private firestore: AngularFirestore,
    private googleChartsService: GooglechartService
  ) {}

  ngOnInit(): void {
    this.googleChartsService.loadChartPackages().then(() => {
      this.firestore.collection('results').valueChanges().subscribe((data: any[]) => {
        this.data = data as StudentData[];
        this.processData();
        this.drawChart();
      });
    });
  }

  processData() {
    // Process data as needed
    this.passCount = this.data.filter(student => student.percentage >= 40).length;
    this.failCount = this.data.length - this.passCount;
  }

  drawChart() {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Category');
    dataTable.addColumn('number', 'Count');
    dataTable.addRows([
      ['Passed', this.passCount],
      ['Failed', this.failCount],
    ]);

    const options = {
      title: 'Pass/Fail Ratio',
      pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(document.getElementById('chartS'));
    chart.draw(dataTable, options);
  }
}



