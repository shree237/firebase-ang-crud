
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent {

  createStudent: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Add Result';

  constructor(private fb: FormBuilder,
    private result: ResultService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createStudent = this.fb.group({
      name: ['', Validators.required],
      rollno: ['', Validators.required],
      math: ['', Validators.required],
      english: ['', Validators.required],
      science: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.isEditing();
  }

  addEditResult() {
    this.submitted = true;

    if (this.createStudent.invalid) {
      return;
    }

    if (this.id === null) {
      this.title = 'Add Result';
      this.addResult();
    } else {
      this.editResult(this.id);
    }

  }

  addResult() {
    const result: any = {
      name: this.createStudent.value.name,
      rollno: this.createStudent.value.rollno,
      math: this.createStudent.value.math,
      english: this.createStudent.value.english,
      science: this.createStudent.value.science,
      creationDate: new Date(),
      updateDate: new Date()
    }
    result.total = result.math + result.english + result.science;
    result.percentage = (result.total / 3).toFixed(2); 

    this.loading = true;
    this.result.addResultService(result).then(() => {
      this.toastr.success('Result added successfully!', 'student Registered', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editResult(id: string) {

    const result: any = {
      name: this.createStudent.value.name,
      rollno: this.createStudent.value.rollno,
      math: this.createStudent.value.math,
      english: this.createStudent.value.english,
      science: this.createStudent.value.science,
      updateDate: new Date()
    }

    result.total = result.math + result.english + result.science;
    result.percentage = (result.total / 3).toFixed(2); 
    
    this.loading = true;

    this.result.updateResultService(id, result).then(() => {
      this.loading = false;
      this.toastr.info('result modified successfully', 'result modified', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/dashboard']);
    })
  }


  isEditing() {
    if (this.id !== null) {
      this.loading = true;
      this.result.getResultService(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data());
        const resultData = {
          name: data.payload.data()['name'],
          rollno: data.payload.data()['rollno'],
          math: data.payload.data()['math'],
          english: data.payload.data()['english'],
          science: data.payload.data()['science'],
        };
        this.createStudent.setValue(resultData);
        this.title = 'Edit Result';
      });
    }
  }
  


}
