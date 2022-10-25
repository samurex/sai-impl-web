import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AddSocialAgentComponent } from './add-social-agent.component';

describe('AddSocialAgentComponent', () => {
  let component: AddSocialAgentComponent;
  let fixture: ComponentFixture<AddSocialAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialAgentComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [ provideMockStore({}), {
        provide: ActivatedRoute,
        useValue: {snapshot: {queryParamMap: convertToParamMap({webid: 'https://bob.example'})}}
      } ]
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
