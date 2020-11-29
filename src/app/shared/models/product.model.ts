import { ThrowStmt } from '@angular/compiler';

export class Product {
    key: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    constructor(name?: string, description?: string, image?: string, category?: string, price?: number){
        this.name = name;
        this.description = description;
        this.image = image;
        this.category = category;
        this.price = price;
    }
}

export class Option {
    name: string;
    price: number;
}