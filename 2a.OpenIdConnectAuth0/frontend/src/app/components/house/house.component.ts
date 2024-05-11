import { Component, Input } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { Observable } from 'rxjs';
import { House } from '../../types/house';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css',
})
export class HouseComponent {
  @Input()
  set id(houseId: number) {
    this.houseService.getHouse(houseId).subscribe((h) => (this.house = h));
  }

  house!: House;
  constructor(private houseService: HouseService) {}
}
