import { Product } from './../../models/product.model';
import { addItem } from './cart.actions';
import { createReducer, on } from '@ngrx/store';

export interface CartState {
    products: Array<Product>
}

export const initialState = {
    products: [
    ]
};

const _cartReducer = createReducer(
    initialState,
    on(addItem, (state, product) => (Object.assign({}, state, { products: [...state.products, product.product] }))
    ));

export function cartReducer(state, action) {
    return _cartReducer(state, action);
}