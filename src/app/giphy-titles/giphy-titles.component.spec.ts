import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyTitlesComponent } from './giphy-titles.component';

describe('GiphyTitlesComponent', () => {
  let component: GiphyTitlesComponent;
  let fixture: ComponentFixture<GiphyTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiphyTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
