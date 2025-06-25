import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTrip implements OnInit {

  // This holds the form structure and values
  editForm!: FormGroup;

  // Used to indicate the form has been submitted
  submitted = false;

  // Holds the trip data once retrieved from backend
  trip!: Trip;

  // Message for logging or user feedback
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    // Get the tripCode that was saved in localStorage
    const tripCode = localStorage.getItem("tripCode");

    if (!tripCode) {
      alert("Could not find stored tripCode!");
      this.router.navigate(['']); // Redirect to home if missing
      return;
    }

    console.log('tripCode:', tripCode);

    // Set up the form structure with validation
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required], // This is the date field
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Fetch the trip data by code
    this.tripData.getTrip(tripCode).subscribe({
      next: (value: Trip[]) => {
        if (value && value.length > 0) {
          this.trip = value[0];

          // Convert ISO date (e.g., "2022-01-19T00:00:00.000Z") 
          // to "yyyy-MM-dd" which HTML date input accepts
          //if (this.trip.start) {
           // this.trip.start = this.trip.start.split('T')[0];
           //console.log(this.trip.start);
          //}

          // Load the trip data into the form
          this.editForm.patchValue(this.trip);

          this.message = `Trip: ${tripCode} retrieved`;
        } else {
          this.message = 'No trip retrieved!';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }

  // This is a shortcut to get easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  // Runs when the Save button is clicked
  onSubmit(): void {
    this.submitted = true;

    // Only try to update if the form is valid
    if (this.editForm.valid) {
      this.tripData.updateTrip(this.editForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/']); // Redirect to main screen after save
        },
        error: (error: any) => {
          console.log('Error:', error);
        }
      });
    }
  }
}
