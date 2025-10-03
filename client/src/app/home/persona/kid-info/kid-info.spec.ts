import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidInfo } from './kid-info';

describe('KidInfo', () => {
  let component: KidInfo;
  let fixture: ComponentFixture<KidInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
