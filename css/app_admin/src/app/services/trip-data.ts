import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user'; // page 207
import { AuthResponse } from '../models/auth-response'; // p. 207
import { BROWSER_STORAGE } from '../storage'; // p. 207

@Injectable({
  providedIn: 'root'
})
export class TripData {
  baseUrl = 'http://localhost:3000/api'; // p 208
  private tripsUrl = `${this.baseUrl}/trips`; // Replaced old `url`p 208

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripsUrl}/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}/${formData.code}`, formData);
  }

  // Call to our /login endpoint, returns JWT 
  login(user: User, passwd: string) : Observable<AuthResponse> { 
    // console.log('Inside TripDataService::login'); 
    return this.handleAuthAPICall('login', user, passwd); 
  } 
 
  // Call to our /register endpoint, creates user and returns JWT 
  register(user: User, passwd: string) : Observable<AuthResponse> { 
    // console.log('Inside TripDataService::register'); 
    return this.handleAuthAPICall('register', user, passwd); 
  } 
 
  // helper method to process both login and register methods 
  handleAuthAPICall(endpoint: string, user: User, passwd: string) : 
Observable<AuthResponse> { 
    // console.log('Inside TripDataService::handleAuthAPICall'); 
    let formData = { 
      name: user.name, 
      email: user.email, 
      password: passwd 
    }; 
 
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, 
formData); 
  }
}
