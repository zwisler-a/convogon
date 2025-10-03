import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NscInfo } from './nsc-info';

describe('NscInfo', () => {
  let component: NscInfo;
  let fixture: ComponentFixture<NscInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NscInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NscInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
