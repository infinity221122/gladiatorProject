import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resource-allocate',
  templateUrl: './resource-allocate.component.html',
  styleUrls: ['./resource-allocate.component.scss']
})
export class ResourceAllocateComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  resourceList: any[] = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  eventList: any[] = [];
 
  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }
 
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      eventId: ['', Validators.required],
      resourceId: ['', Validators.required]
    });
    this.getResources();
    this.getEvent();
  }
 
  onSubmit(): void {
    // debugger;
    if (this.itemForm.valid) {
      const { eventId, resourceId, quantity } = this.itemForm.value;
      console.log('Event ID:', eventId);  // Debugging log
      console.log('Resource ID:', resourceId);  // Debugging log
      console.log('Quantity:', quantity);  // Debugging log
      const allocationData = { quantity };
      this.httpService.allocateResources(eventId, resourceId, allocationData).subscribe(
        (response) => {
          this.showMessage = true;
          this.responseMessage = 'Resource allocated successfully';
          this.itemForm.reset();
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Failed to allocate resource';
        }
      );
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
 
  getEvent() {
    this.httpService.GetAllevents().subscribe(
      (data) => {
        this.eventList = data;
        console.log('Event List:', this.eventList);  // Debugging log
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'Failed to fetch events';
      }
    );
  }
 
  getResources() {
    this.httpService.GetAllResources().subscribe(
      (data) => {
        this.resourceList = data;
        console.log('Resource List:', this.resourceList);  // Debugging log
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'Failed to fetch resources';
      }
    );
  }
}
