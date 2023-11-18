import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private angfire:AngularFirestore) { }

  // add student

  addstudent(student:Student){
    student.id = this.angfire.createId()
    return this.angfire.collection('/students').add(student)
  }

  // get all students

  getAllStudents(){
    return this.angfire.collection('/students').snapshotChanges()
  }

  // delete students


  deleteStudent(student:Student){
    return this.angfire.doc('/students/'+student.id).delete();
  }

  // Update student 

  updateStudent(student:Student){
    this.deleteStudent(student)
    this.addstudent(student)

  }

}
