import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAnalyticsComponent } from './player-analytics.component';

describe('RankedRecordComponent', () => {
  let component: PlayerAnalyticsComponent;
  let fixture: ComponentFixture<PlayerAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
