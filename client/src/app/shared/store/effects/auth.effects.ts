import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {
  SigninError,
  SigninSuccess,
  SignupError, TRY_REFRESH_TOKEN,
  TRY_SIGNIN,
  TRY_SIGNUP,
  TrySignin,
  TrySignup
} from "../actions/auth.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {empty, of, Subscription} from "rxjs";

@Injectable()
export class AuthEffects {

  private _subscription: Subscription;

  @Effect() trySignUp$ = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => action.payload),
    switchMap((user: User) => {
      return this.authService.signup(user);
    }),
    switchMap(() => {
      this.router.navigate(['/signin']);
      return empty();
    }),
    catchError((err: any) => {
      return of(new SignupError(err));
    })
  );

  @Effect() trySignIn$ = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    map((action: TrySignin) => action.payload),
    switchMap((credentials: { email: string, password: string }) => {
      return this.authService.signin(credentials);
    }),
    map((token: string) => {
      localStorage.setItem('token', token);
      return new SigninSuccess(token);
    }),
    catchError((err: any) => {
      return of(new SigninError(err));
    })
  );

  @Effect({dispatch: false}) signInSuccess$ = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    tap(() => {
      if (!this._subscription) {
        this._subscription = this.authService.initTimer().subscribe();
      }
    })
  );

  @Effect() tryRefreshToken$ = this.actions$.pipe(
    ofType(TRY_REFRESH_TOKEN),
    switchMap(() => {
      return this.authService.refreshToken();
    }),
    map((token: string) => {
      localStorage.setItem('token', token);
      return new SigninSuccess(token);
    }),
    catchError((err: any) => {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      // TODO return logout action
      return empty();
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }
}
