import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialAgentComponent } from './add-social-agent.component';

describe('AddSocialAgentComponent', () => {
  let component: AddSocialAgentComponent;
  let fixture: ComponentFixture<AddSocialAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocialAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
