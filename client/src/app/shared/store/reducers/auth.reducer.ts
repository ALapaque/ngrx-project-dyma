import {User} from "../../models/user.model";
import {AuthActions, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNUP_ERROR} from "../actions/auth.actions";

export interface AuthState {
  user: User;
  token: string;
  error: string;
  isLoggedIn: boolean;
}

export function authReducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case SIGNIN_ERROR:
    case SIGNUP_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true,
        error: null
      };
    }
  }
  return state;
}
