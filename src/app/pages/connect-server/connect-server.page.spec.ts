import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ConnectServerPage } from './connect-server.page';
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ConnectServerComponent', () => {
  let component: ConnectServerPage;
  let fixture: ComponentFixture<ConnectServerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectServerPage ],
      providers: [ provideMockStore({}) ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectServerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
