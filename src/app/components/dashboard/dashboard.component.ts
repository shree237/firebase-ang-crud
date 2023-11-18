import { Component } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  studentList : Student[] = []
  studentObj : Student = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    mobileno: ''
  }
    id:string =''
    firstname:string=''
    lastname:string=''
    email:string=''
    mobileno:string=''

  constructor(private auth:AuthService, private data:DataServiceService){}


  ngOnInit():void {
    this.getAllStudents()
  }

  

  getAllStudents() {
    // Check if studentList is already populated
    if (this.studentList.length === 0) {
      this.data.getAllStudents().subscribe(res => {
        this.studentList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      });
    }
  }
  

  resetForm(){
    this.id =''
    this.firstname=''
    this.lastname=''
    this.email=''
    this.mobileno=''
  }
  
  addStudents(){

    if(this.firstname == '' || this.lastname == '' || this.email == '' || this.mobileno == ''){
      alert('please fill all the fields')
      return
    }
    this.studentObj.id = ''
    this.studentObj.email = this.email
    this.studentObj.firstname = this.firstname
    this.studentObj.lastname = this.lastname
    this.studentObj.mobileno = this.mobileno

    this.data.addstudent(this.studentObj)
    this.resetForm()
    
  }
  

  updateStudent(){
    
  }


  deleteStudent(student:Student){
    if(window.confirm('Are you sure you want to delete ' + student.firstname+ ' '+ student.lastname+ ' ?')){
      this.data.deleteStudent(student)
    }
    
  }
  logout(){
    this.auth.logout()
  }
}  

