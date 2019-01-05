import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPageComponent } from './popup-page.component';

describe('PopupPageComponent', () => {
  let component: PopupPageComponent;
  let fixture: ComponentFixture<PopupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
