import { Component, OnInit } from '@angular/core';
import { JsonPipe, CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { trips } from '../data/trips';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip'; 
import { TripData } from '../services/trip-data'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication'; // Module 7


@Component({
  selector: 'app-trip-listing',
  imports: [NgFor, CurrencyPipe, CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  providers: [TripData]
})
export class TripListing implements OnInit {
  trips: Array<any> = trips;
  message: string = '';

constructor( //updated M7
  private tripData: TripData,
  private router: Router,
  private authService: AuthService
) {
  console.log('trip-listing constructor');
}


public addTrip(): void {
  this.router.navigate(['add-trip']);
}


  private getStuff(): void { 
    this.tripData.getTrips().subscribe({
      next: (value: any) => { 
        this.trips = value; 
        if (value.length > 0) { 
          this.message = 'There are ' + value.length + ' trips available.'; 
        } else { 
          this.message = 'There were no trips retrieved from the database'; 
        } 
        console.log(this.message); 
      }, 
      error: (error: any) => { 
        console.log('Error: ' + error); 
      } 
    }); 
  }
// updated for M7
  public isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}
  ngOnInit(): void { 
    console.log('ngOnInit'); 
    this.getStuff();
  }
}
