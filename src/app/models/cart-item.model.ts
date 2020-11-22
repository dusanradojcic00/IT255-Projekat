import { props } from '@ngrx/store';
import { Product } from './product.model';
export class CartItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity?: number) {
        this.product = product;
        quantity ? this.quantity = quantity : this.quantity = 1;
    }
}