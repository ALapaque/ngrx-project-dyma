import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "../reducers/auth.reducer";

export const authSelector = createFeatureSelector('auth');
export const errorAuthSelector = createSelector(authSelector,
  (authState: AuthState) => {
    if (!authState) {
      return null;
    }
    return authState.error;
  }
);

export const tokenSelector = createSelector(authSelector,
  (authState: AuthState) => {
    if (!authState) {
      return null;
    }
    return authState.token;
  }
);
