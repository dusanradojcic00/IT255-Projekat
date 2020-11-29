import { User } from '@shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const userLogin = createAction('[User] Login', props<{user: User}>());
export const userLogout = createAction('[User] Logout');