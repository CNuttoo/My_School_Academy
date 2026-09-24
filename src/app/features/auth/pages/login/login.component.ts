
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
@Component({
    selector: 'app-login', imports: [ReactiveFormsModule], templateUrl: './login.component.html', styleUrls: ['./login.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  submitted=false;
  readonly form=this.formBuilder.nonNullable.group({email:['admin@northstar.edu',[Validators.required,Validators.email]],password:['password',[Validators.required,Validators.minLength(6)]],rememberMe:[true]});
  constructor(private readonly formBuilder:FormBuilder,private readonly authService:AuthService,private readonly router:Router,private readonly route:ActivatedRoute){}
  submit():void{this.submitted=true;if(this.form.invalid){this.form.markAllAsTouched();return;}this.authService.signIn();const returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')??'/dashboard';void this.router.navigateByUrl(returnUrl);}
}
