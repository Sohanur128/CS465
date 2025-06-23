import { Component, OnInit, Input } from '@angular/core';
import { JsonPipe, CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';



@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit{

  @Input('trip') trip: any;

    constructor(private router: Router ) {}
    ngOnInit(): void {
      
    }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
    }

}
