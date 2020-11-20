import { Product } from './../../models/product.model';
import { createAction, props } from '@ngrx/store';

export const addItem = createAction('[Cart] Add item', props<{product: Product}>());