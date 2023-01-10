import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccessNeedViewComponent} from './access-need-view.component';
import {AppModule} from "../../app.module";

describe('AccessNeedViewComponent', () => {
  let component: AccessNeedViewComponent;
  let fixture: ComponentFixture<AccessNeedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ AccessNeedViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessNeedViewComponent);
    component = fixture.componentInstance;
    component.need = {id: '1', label: 'access', shapeTree: 'tree', access: [], children: []};
    component.shapetree = {id: 'tree', label: 'shapetree label'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
