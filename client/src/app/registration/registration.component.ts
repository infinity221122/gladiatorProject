import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { role:null, email:'', password:'', username:'' };
  showMessage: boolean = false;
  responseMessage: any;
  role=['Choose Role','PLANNER','STAFF','CLIENT']
 
  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.role[0], [Validators.required]]
     
    });
  }
 
  ngOnInit(): void {}
 
  onRegister(): void {
    if (this.itemForm.valid) {
      this.httpService.registerUser(this.itemForm.value).subscribe(
        response => {
          this.showMessage = true;
          this.responseMessage = 'User registered successfully';
          this.itemForm.reset();
          this.router.navigate(['/login']);

        },
        error => {
          this.showMessage = true;
          this.responseMessage = 'Failed to register user';
        }
      );
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
}
