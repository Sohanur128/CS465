import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService, Trip } from '../trip.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe((data: Trip[]) => {
      this.trips = data;
    });
  }
}
