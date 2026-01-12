import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor(
    private router:Router
  ){
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
  }
}
