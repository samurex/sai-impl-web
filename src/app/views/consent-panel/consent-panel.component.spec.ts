import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentPanelComponent } from './consent-panel.component';

describe('ConsentPanelComponent', () => {
  let component: ConsentPanelComponent;
  let fixture: ComponentFixture<ConsentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
