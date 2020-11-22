import { CartItem } from './../../models/cart-item.model';
import { createAction, props } from '@ngrx/store';

export const addItem = createAction('[Cart] Add item', props<{cartItem: CartItem}>());
export const removeItem = createAction('[Cart] Remove item', props<{cartItem: any}>());
