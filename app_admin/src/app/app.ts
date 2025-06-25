import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripListing } from './trip-listing/trip-listing';
import { NavbarComponent } from './navbar/navbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Travlr Gateways Admin!';
}
