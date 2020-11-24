import { CartItem } from './cart-item.model';
export class Order {
    products: CartItem[];
    total: number;
    user: string;
    date: number;
    month: string;
    constructor(products: CartItem[], total: number, user: string, date?: number, month?: string){
        this.products = products;
        this.total = total;
        this.user = user;
        this.date = date;
        this.month = month;
    }
}