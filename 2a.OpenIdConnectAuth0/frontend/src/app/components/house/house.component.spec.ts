import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseComponent } from './house.component';

describe('HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
