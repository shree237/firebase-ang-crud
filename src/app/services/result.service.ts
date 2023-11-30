import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private firestore : AngularFirestore) { }

  addResultService(result: any): Promise<any> {
    return this.firestore.collection('results').add(result);
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
}

