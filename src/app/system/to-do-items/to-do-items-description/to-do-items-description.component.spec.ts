import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemsDescriptionComponent } from './to-do-items-description.component';

describe('ToDoItemsDescriptionComponent', () => {
  let component: ToDoItemsDescriptionComponent;
  let fixture: ComponentFixture<ToDoItemsDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoItemsDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoItemsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
