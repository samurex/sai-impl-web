import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';
import {provideMockStore} from "@ngrx/store/testing";

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      providers: [
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
