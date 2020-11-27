import { CartItem } from './cart-item.model';
export class Order {
    key: string;
    products: CartItem[];
    total: number;
    user: string;
    date: number;
    month: string;
    status: string;
    statusCode: number;
    constructor(products: CartItem[], total: number, user: string, date?: number, month?: string, status?: string, statusCode?: number){
        this.products = products;
        this.total = total;
        this.user = user;
        this.date = date;
        this.month = month;
        this.status = status;
        this.statusCode = statusCode;
    }
}

export enum StatusCode {
    PENDING,
    AWAITING_SHIPPING,
    SHIPPED,
    COMPLETED,
    DECLINED
}