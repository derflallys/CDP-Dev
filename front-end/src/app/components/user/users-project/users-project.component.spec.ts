import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersProjectComponent} from './users-project.component';

describe('UsersProjectComponent', () => {
  let component: UsersProjectComponent;
  let fixture: ComponentFixture<UsersProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
