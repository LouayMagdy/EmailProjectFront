import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerPageComponent } from './logger-page.component';

describe('LoggerPageComponent', () => {
  let component: LoggerPageComponent;
  let fixture: ComponentFixture<LoggerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
