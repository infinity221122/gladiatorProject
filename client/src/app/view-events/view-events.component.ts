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

  itemForm: FormGroup; 
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  eventObj:any=[];
  assignModel: any={};

  showMessage: any;
  responseMessage: any;
  isUpdate: any=false;
  eventsList: any=[];
;
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        title: [this.formModel.title,[ Validators.required]],
        description: [this.formModel.description,[ Validators.required]],
        dateTime: [this.formModel.dateTime,[ Validators.required]],
        location: [this.formModel.location,[ Validators.required]], 
        status: [this.formModel.status,[ Validators.required]], 
       
    });

   
  }
  
  ngOnInit(): void {
    // this.getAllEvents();
  }

  // getAllEvents() {
  //   this.httpService.GetAllevents().subscribe((data: any) => {
  //     this.eventsList = data;
  //     console.log(this.eventsList);
  //   }, error => {
  //     this.showError = true;
  //     this.errorMessage = `An error occurred while fetching events: ${error.message}. Please try again later.`;
  //     console.error('Fetch error:', error);
  //   });
  // }
  

  searchEvent() {
    debugger;
    if(this.formModel.eventID!=null)
    {
      this.isUpdate=false;
      this.httpService.GetEventdetails(this.formModel.eventID).subscribe((data: any) => {
        this.eventObj=data;
        console.log(this.eventObj);
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred.. Please try again later.";
        console.error('Login error:', error);
      });;
    }
  
  }

 
  onSubmit()
  {
    if(this.itemForm.valid)
    {
      if (this.itemForm.valid) {
        this.showError = false;
        this.httpService.updateEvent(this.itemForm.value, this.formModel.eventID).subscribe((data: any) => {
          this.itemForm.reset();
         this.isUpdate=false;
          this.showMessage=true;
          this.responseMessage='Save Successfully';
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = "An error occurred while created in. Please try again later.";
          console.error('Login error:', error);
        });;
      } else {
        this.itemForm.markAllAsTouched();
      }
    }
    else{
      this.itemForm.markAllAsTouched();
    }
  }
  // edit(val:any)
  // {
  //   this.isUpdate=true;
  //   let dateTime=new Date(val.dateTime);
  //   this.itemForm.patchValue({
  //     title:val.title,
  //     description:val.description,
  //     dateTime:dateTime.toISOString().substring(0,10),
  //     location:val.location,
  //     status:val.status

  //   })
  // }

  edit(eventId: any) {
      this.isUpdate = true;
      this.httpService.GetEventdetails(eventId).subscribe((val: any) => {
        let dateTime = new Date(val.dateTime);
        this.itemForm.patchValue({
          title: val.title,
          description: val.description,
          dateTime: dateTime.toISOString().substring(0, 10),
          location: val.location,
          status: val.status
        });
      }
       ) 
      }
}
