import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../models/order.model";

@Injectable({ providedIn: 'root'})
export class AdminOrderService{

    private baseUrl='http://localhost:8080/order-service';
    constructor(
        private http:HttpClient
    ){}

    getAllOrders():Observable<Order[]>{
        return this.http.get<Order[]>(`${this.baseUrl}/orders`);
    }
    getOrderById(id:number):Observable<Order>{
        return this.http.get<Order>(`${this.baseUrl}/orders/${id}`)
    }
}