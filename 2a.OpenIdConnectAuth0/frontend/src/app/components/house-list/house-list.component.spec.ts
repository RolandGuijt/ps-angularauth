import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseListComponent } from './house-list.component';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
