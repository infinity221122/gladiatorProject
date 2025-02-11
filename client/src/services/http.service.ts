import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName=environment.apiUrl;
   constructor(private http: HttpClient, private authService: AuthService) {}
  
    getBookingDetails(eventId: any): Observable<any> {
      const url = `${this.serverName}/api/client/booking-details/${eventId}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.get<any>(url, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    GetEventdetails(eventId: any): Observable<any> {
      const url = `${this.serverName}/api/staff/event-details/${eventId}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.get<any>(url, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    GetAllevents(): Observable<any> {
      const url = `${this.serverName}/api/planner/events`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.get<any>(url, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    GetAllResources(): Observable<any> {
      const url = `${this.serverName}/api/planner/resources`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.get<any>(url, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    createEvent(details: any): Observable<any> {
      const url = `${this.serverName}/api/planner/event`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.post<any>(url, details, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    updateEvent(details: any, eventId: any): Observable<any> {
      const url = `${this.serverName}/api/staff/update-setup/${eventId}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.put<any>(url, details, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    addResource(details: any): Observable<any> {
      const url = `${this.serverName}/api/planner/resource`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.post<any>(url, details, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
   allocateResources(eventId: any, resourceId: any, details: any): Observable<any> {
     const url = `${this.serverName}/api/planner/allocate-resources?eventId=${eventId}&resourceId=${resourceId}`;
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${this.authService.getToken()}`
     });
     return this.http.post<any>(url, details, { headers }).pipe(
       catchError(this.handleError)
     );
   }
  
    Login(details: any): Observable<any> {
      const url = `${this.serverName}/api/user/login`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post<any>(url, details, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    registerUser(details: any): Observable<any> {
      const url = `${this.serverName}/api/user/register`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post<any>(url, details, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);
      return throwError(()=> new Error("Error") );
    }
  

}
