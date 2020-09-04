import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {select, Store} from "@ngrx/store";
import {State} from "../../shared/store";
import {TrySignin} from "../../shared/store/actions/auth.actions";
import {Observable} from "rxjs";
import {errorAuthSelector} from "../../shared/store/selectors/auth.selectors";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });

    this.error$ = this.store.pipe(
      select(errorAuthSelector)
    );
  }

  public submit(): void {
    this.store.dispatch(new TrySignin(this.form.value));
  }


}
