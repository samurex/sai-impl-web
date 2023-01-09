import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ServiceWorkerModule} from '@angular/service-worker';
import {provideMockStore} from '@ngrx/store/testing';
import {AppComponent} from './app.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
        TranslateModule.forRoot({loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }}),
  ],
      declarations: [
        AppComponent
      ],
      providers: [ provideMockStore({}) ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sai-web-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('sai-web-app');
  });
});
