import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewComponent } from './app-view.component';

describe('AppViewComponent', () => {
  let component: AppViewComponent;
  let fixture: ComponentFixture<AppViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppViewComponent);
    component = fixture.componentInstance;
    component.application = {id: 'appId', logo: 'http://logo', name: 'App', authorizationDate: '', accessNeedGroup: 'ang'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
