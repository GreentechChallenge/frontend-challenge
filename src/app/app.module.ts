import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule, routing } from './app-routing.module';
import { FormChallengeModule } from './form-challenge/form-challenge.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormChallengeComponent } from './form-challenge/form-challenge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldControlErrorComponent } from './field-control-error/field-control-error.component';
import { MyDatePickerModule } from 'mydatepicker';
import { DropdownModule } from 'primeng/dropdown';
import { } from 'googlemaps';
import { RegisterChallengeComponent } from './register-challenge/register-challenge.component';


@NgModule({
  declarations: [
    AppComponent,
    FormChallengeComponent,
    FieldControlErrorComponent,
    RegisterChallengeComponent
  ],
  imports: [
    BrowserModule,
    FormChallengeModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MyDatePickerModule,
    DropdownModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
