import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScInfo } from './sc-info';

describe('ScInfo', () => {
  let component: ScInfo;
  let fixture: ComponentFixture<ScInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
