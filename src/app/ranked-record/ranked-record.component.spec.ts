import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedRecordComponent } from './ranked-record.component';

describe('RankedRecordComponent', () => {
  let component: RankedRecordComponent;
  let fixture: ComponentFixture<RankedRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankedRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankedRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
