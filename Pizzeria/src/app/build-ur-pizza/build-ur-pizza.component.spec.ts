import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildUrPizzaComponent } from './build-ur-pizza.component';

describe('BuildUrPizzaComponent', () => {
  let component: BuildUrPizzaComponent;
  let fixture: ComponentFixture<BuildUrPizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildUrPizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildUrPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
