import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialAgentFormComponent } from './add-social-agent-form.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddSocialAgentFormComponent', () => {
  let component: AddSocialAgentFormComponent;
  let fixture: ComponentFixture<AddSocialAgentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialAgentFormComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ]
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
