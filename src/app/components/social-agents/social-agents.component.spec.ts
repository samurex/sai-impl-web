import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SocialAgentsComponent } from './social-agents.component';


describe('SocialAgentsComponent', () => {
  let component: SocialAgentsComponent;
  let fixture: ComponentFixture<SocialAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialAgentsComponent ],
      providers: [ provideMockStore({}) ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
