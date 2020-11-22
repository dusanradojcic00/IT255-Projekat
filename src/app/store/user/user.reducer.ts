import { User } from './../../models/user.model';

import { userLogin, userLogout } from './user.action';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface UserState {
    isAuthenticated: boolean;
}

export const initialState = {
    isAuthenticated: false,
};

const _loginReducer = createReducer(
    initialState,
    on(userLogin, (state) => ({ ...state, isAuthenticated: true })),
    on(userLogout, (state) => ({ ...state, isAuthenticated: false }))
);

export function loginReducer(state, action) {
    return _loginReducer(state, action);
}

export const getUserState = createFeatureSelector<UserState>('user');

export const getUserStatus = createSelector(
    getUserState,
    (state: UserState) => state.isAuthenticated
);