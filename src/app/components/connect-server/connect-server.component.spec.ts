import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ConnectServerComponent } from './connect-server.component';

describe('ConnectServerComponent', () => {
  let component: ConnectServerComponent;
  let fixture: ComponentFixture<ConnectServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectServerComponent ],
      providers: [ provideMockStore({}) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
