import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialAgentFormComponent } from './add-social-agent-form.component';

describe('AddSocialAgentFormComponent', () => {
  let component: AddSocialAgentFormComponent;
  let fixture: ComponentFixture<AddSocialAgentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialAgentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocialAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
