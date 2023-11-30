import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/services/auth.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // studentList : Student[] = []
  // studentObj : Student = {
  //   id: '',
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   mobileno: ''
  // }
  //   id:string =''
  //   firstname:string=''
  //   lastname:string=''
  //   email:string=''
  //   mobileno:string=''

  // constructor(private auth:AuthService, private data:DataServiceService){}


  // ngOnInit():void {
  //   this.getAllStudents()
  // }

  

  // getAllStudents() {
  
  //   if (this.studentList.length === 0) {
  //     this.data.getAllStudents().subscribe(res => {
  //       this.studentList = res.map((e: any) => {
  //         const data = e.payload.doc.data();
  //         data.id = e.payload.doc.id;
  //         return data;
  //       });
  //     });
  //   }
  // }
  


  // addStudents(){

  //   if(this.firstname == '' || this.lastname == '' || this.email == '' || this.mobileno == ''){
  //     alert('please fill all the fields')
  //     return
  //   }
  //   this.studentObj.id = ''
  //   this.studentObj.email = this.email
  //   this.studentObj.firstname = this.firstname
  //   this.studentObj.lastname = this.lastname
  //   this.studentObj.mobileno = this.mobileno

  //   this.data.addstudent(this.studentObj)
  //   this.resetForm()
    
  // }
  // editStudent(student: Student) {
  //   this.id = student.id;
  //   this.firstname = student.firstname;
  //   this.lastname = student.lastname;
  //   this.email = student.email;
  //   this.mobileno = student.mobileno;
  // }
  

  // updateStudent() {
  //   const updatedStudent: Student = {
  //     id: this.id,
  //     firstname: this.firstname,
  //     lastname: this.lastname,
  //     email: this.email,
  //     mobileno: this.mobileno,
  //   };
  
  //   this.data.updateStudent(updatedStudent);
  //   this.resetForm();
  // }
  // resetForm() {
  //   this.id = '';
  //   this.firstname = '';
  //   this.lastname = '';
  //   this.email = '';
  //   this.mobileno = '';
  // }
    


  // deleteStudent(student:Student){
  //   if(window.confirm('Are you sure you want to delete ' + student.firstname+ ' '+ student.lastname+ ' ?')){
  //     this.data.deleteStudent(student)
  //   }
    
  // }
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

