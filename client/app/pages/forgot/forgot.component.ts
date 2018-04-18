import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { UserService } from '../../services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  title = 'Reset Password';
  @Input() passwordToCheck: string;

  resetForm: FormGroup;
  oldPass = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
  ]);

  public account = {
    password: null
  }

  public barLabel = 'Password strength:';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService
  ) {
  }  

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      oldPass: this.oldPass,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  resetPassword() {

    const params = {
      oldpwd: this.resetForm.value.oldPass,
      newpwd: this.resetForm.value.password
    }
    this.userService.resetPassword(params).subscribe(
      res => {
        console.log(res)
        this.toast.open('Password changed successfully!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.open('Please insert old password correctly', 'danger')
    );
  }
}
