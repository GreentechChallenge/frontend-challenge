import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChallengeComponent } from './register-challenge.component';

describe('RegisterChallengeComponent', () => {
  let component: RegisterChallengeComponent;
  let fixture: ComponentFixture<RegisterChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
