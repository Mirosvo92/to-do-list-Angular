import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemsTitleComponent } from './to-do-items-title.component';

describe('ToDoItemsTitleComponent', () => {
  let component: ToDoItemsTitleComponent;
  let fixture: ComponentFixture<ToDoItemsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoItemsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoItemsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
