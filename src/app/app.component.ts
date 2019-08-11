import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loginForm: FormGroup;
  title = 'saidtec';
  isLoading = true;

  constructor(public user: UserService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.initForm();
    }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    this.isLoading = false;
  }

  async login() {
    await this.user.login(this.loginForm.value)
    this.router.navigate(['/cadastro-cliente'])
  }

  logout() {
    this.user.logout()
  }
}
