import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglechartService {

  constructor() { }
  loadChartPackages(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        resolve();
      });
    });
  }
}
