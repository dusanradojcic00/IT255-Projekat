import { CartItem } from '@shared/models/cart-item.model';
import { createAction, props } from '@ngrx/store';

export const addItem = createAction('[Cart] Add item', props<{cartItem: CartItem}>());
export const removeItem = createAction('[Cart] Remove item', props<{cartItem: any}>());
export const removeAllItems = createAction('[Cart] Remove all items');