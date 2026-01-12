export interface OrderItem{
    productName:string;
    quantity:number;
    price:number;
    subTotal:number;
}

export interface Order{
    id:number;
    customerEmail:string;
    orderDate:string;
    status:string;
    totalAmount:number;
    items:OrderItem[];
}