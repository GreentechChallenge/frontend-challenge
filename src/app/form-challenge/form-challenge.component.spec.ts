import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormChallengeComponent } from './form-challenge.component';
import { FieldControlErrorComponent } from '../field-control-error/field-control-error.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routing } from '../app-routing.module';
import { RegisterChallengeComponent } from '../register-challenge/register-challenge.component';
import { APP_BASE_HREF } from '@angular/common';

describe('FormChallengeComponent', () => {
  let component: FormChallengeComponent;
  let fixture: ComponentFixture<FormChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormChallengeComponent,
        FieldControlErrorComponent,
        RegisterChallengeComponent
      ],
      imports : [
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        MyDatePickerModule,
        HttpModule,
        RouterModule,
        AppRoutingModule,
        routing
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/'}
      ],
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
