import { userLogin, userLogout } from './user.action';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface UserData {
    uid: string,
    username: string
}
export interface UserState {
    isAuthenticated: boolean;
    user: UserData 
}

const getUserFromStorage = () : UserState => {
    if (localStorage.getItem('username') !== null){
        return {
            isAuthenticated: true,
            user: {
                uid: localStorage.getItem('userId'),
                username: localStorage.getItem('username')
            }
        }
    } else {
        return {
            isAuthenticated: false,
            user: null
        }
    }
}


export const initialState = {
    ...getUserFromStorage()
};

const _loginReducer = createReducer(
    initialState,
    on(userLogin, (state, user) => (Object.assign({}, state, { isAuthenticated: true, user: user.user}))),
    on(userLogout, (state) => (Object.assign({}, state, { isAuthenticated: false, user: null}))
));

export function loginReducer(state, action) {
    return _loginReducer(state, action);
}

export const _getUserState = createFeatureSelector<UserState>('user');

export const getUserStatus = createSelector(
    _getUserState,
    (state: UserState) => state.isAuthenticated
);

export const _getUser  = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
    _getUserState,
    (state: UserState) => state.user
);