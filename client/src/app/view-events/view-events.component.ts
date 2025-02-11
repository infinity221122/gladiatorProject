import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
 
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
 
export class ViewEventsComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventObj: any = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  isUpdate: any = false;
 
  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }
 
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      eventId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
 
  searchEvent(): void {
    const eventId = this.formModel.eventId;
    if (eventId) {
      this.httpService.GetEventdetails(eventId).subscribe(
        (data) => {
          this.eventObj = data;
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Failed to fetch event details';
        }
      );
    }
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      const eventId = this.formModel.eventId;
      this.httpService.updateEvent(this.itemForm.value, eventId).subscribe(
        (response) => {
          this.showMessage = true;
          this.responseMessage = 'Event updated successfully';
          this.itemForm.reset();
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Failed to update event';
        }
      );
    }
  }
 
  edit(val: any) {
    this.itemForm.setValue({
      eventId: val.eventId,
      title: val.title,
      description: val.description,
      dateTime: val.dateTime,
      location: val.location,
      status: val.status
    });
    this.isUpdate = true;
  }
}
 
 