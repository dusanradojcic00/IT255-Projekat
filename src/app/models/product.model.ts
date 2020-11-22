export class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;

    constructor(name?: string, description?: string, image?: string, category?: string){
        
    }
}

export class Option {
    name: string;
    price: number;
}