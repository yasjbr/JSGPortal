import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectCheckAllComponent } from './mat-select-check-all.component';

describe('MatSelectCheckAllComponent', () => {
  let component: MatSelectCheckAllComponent;
  let fixture: ComponentFixture<MatSelectCheckAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSelectCheckAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSelectCheckAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
