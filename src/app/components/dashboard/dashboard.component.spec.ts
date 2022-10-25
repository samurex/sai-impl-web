import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideMockStore } from '@ngrx/store/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [ provideMockStore({}) ],
      imports: [
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
