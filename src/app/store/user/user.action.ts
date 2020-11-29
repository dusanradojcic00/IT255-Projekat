import { UserData } from './user.reducer';

import { createAction, props } from '@ngrx/store';

export const userLogin = createAction('[User] Login', props<{user: UserData}>());
export const userLogout = createAction('[User] Logout');