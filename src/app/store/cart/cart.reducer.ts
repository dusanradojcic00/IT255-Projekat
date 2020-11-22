import { CartItem } from './../../models/cart-item.model';
import { addItem, removeItem } from './cart.actions';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface CartState {
    cartItems: Array<CartItem>
}

export const initialState = {
    cartItems: [
        {
            product: {
                category: 'Gazirani sokovi',
                description: 'Coca Cola Flasica',
                image: 'https://bit.ly/3pNMsJ1',
                name: 'Coca Cola',
                price: 100
            },
            quantity: 1
        }
    ]
};

const _cartReducer = createReducer(
    initialState,
    on(addItem, (state, cartItem) => (Object.assign({}, state, { cartItems: [...state.cartItems, cartItem.cartItem] }))),
    on(removeItem, (state, cartItem) => (Object.assign({}, state, {
        cartItems: state.cartItems.filter(item => item.product !== cartItem.cartItem.product)
    })))
);

export function cartReducer(state, action) {
    return _cartReducer(state, action);
}
export const getCartState = createFeatureSelector<CartState>('cart');

export const getCartItems = createSelector(
    getCartState,
    (state: CartState) => state.cartItems
);