export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}