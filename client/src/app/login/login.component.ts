import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
 
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  errorMessage: any;
 
  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {}
 
  onLogin(): void {
    if (this.itemForm.valid) {
      this.httpService.Login(this.itemForm.value).subscribe(
        (response) => {
          this.authService.saveToken(response.token);
          this.authService.SetRole(response.role);
          this.authService.SetId(response.userId);
          this.router.navigate(['/dashboard']);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Invalid credentials';
        }
      );
    }
  }
 
  registration() {
    this.router.navigate(['/registration']);
  }
}