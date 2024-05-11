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
    return this.http.get<House[]>('/houses');
  }

  getHouse(id: number): Observable<House> {
    return this.http.get<House>(`/houses/${id}`);
  }
}
