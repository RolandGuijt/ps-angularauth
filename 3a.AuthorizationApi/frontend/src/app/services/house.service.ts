import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../types/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'X-CSRF': '1',
    }),
  };

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>('/api/houses', this.httpOptions);
  }

  getHouse(id: number): Observable<House> {
    return this.http.get<House>(`/api/houses/${id}`, this.httpOptions);
  }
}
