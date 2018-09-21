import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChallengeComponent } from './form-challenge.component';

describe('FormChallengeComponent', () => {
  let component: FormChallengeComponent;
  let fixture: ComponentFixture<FormChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
