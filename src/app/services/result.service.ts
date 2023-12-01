import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private firestore : AngularFirestore, route:Router) { }

  async addResultService(result: any): Promise<any> {
    const rollno = result.rollno;

    try {
      // Check if a result with the same roll number already exists
      const existingResults = await firstValueFrom(this.getResultByRollNoService(rollno));

      if (existingResults.length === 0) {
        // If no existing result with the same roll number, add the new result
        return await this.firestore.collection('results').add(result);
      } else {
        // If a result with the same roll number already exists, reject with an error
        alert('Result with the same roll number already exists.');
        return Promise.reject('Result with the same roll number already exists.');
        
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getResultByRollNoService(rollno: string): Observable<any[]> {
    return this.firestore.collection('results', ref =>
      ref.where('rollno', '==', rollno)
    ).valueChanges();
  }

  getResultsService(): Observable<any> {
    return this.firestore.collection('results', ref => ref.orderBy('rollno', 'asc')).snapshotChanges();
  }

  deleteResultService(id: string): Promise<any> {
    return this.firestore.collection('results').doc(id).delete();
  }

  getResultService(id: string): Observable<any> {
    return this.firestore.collection('results').doc(id).snapshotChanges();
  }

  updateResultService(id: string, data: any): Promise<any> {
    return this.firestore.collection('results').doc(id).update(data);
  }

  getResultByNameAndRollNoService(name: string, rollno: string): Observable<any> {
    return this.firestore.collection('results', ref =>
      ref.where('name', '==', name).where('rollno', '==', rollno)
    ).snapshotChanges();
  }
}

