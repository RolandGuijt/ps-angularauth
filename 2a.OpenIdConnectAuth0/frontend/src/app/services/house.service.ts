import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../types/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  getHouses(): Observable<House[]> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http.get<House[]>('/houses', httpOptions);
  }

  getHouse(id: number): Observable<House> {
    return this.http.get<House>(`/houses/${id}`);
  }
}
