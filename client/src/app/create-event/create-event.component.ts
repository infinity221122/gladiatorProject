import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
 
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventList: any[] = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  status=['Choose Status','Initiated','Completed','Pending','Incomplete'];
 
  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }
 
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['',[ Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      location: ['', Validators.required],
      status: [this.status[0], [Validators.required]]
    });
    this.getEvent();
  }
 
  getEvent() {
    this.httpService.GetAllevents().subscribe( 
      (data) => {
        this.eventList = data;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'Failed to fetch events';
      }
    );
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.createEvent(this.itemForm.value).subscribe(
        (response) => {
          this.showMessage = true;
          this.responseMessage = 'Event created successfully';
          this.itemForm.reset();
          this.getEvent();
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Failed to create event';
        }
      );
    }
  }
  
}