import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { IMyDpOptions } from 'mydatepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-challenge',
  templateUrl: './form-challenge.component.html',
  styleUrls: ['./form-challenge.component.css']
})
export class FormChallengeComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  cities = [
    {id: 1, name: 'Copenhagen - 2018'},
    {id: 2, name: 'Paris - 2018'}
  ];

  selectedCity: any;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm.dd.yyyy'
  };

  selectedChallenge: '';

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      dropdown: [null, Validators.required],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      company: [null, Validators.required],
      dateincorporation: [null, Validators.required],
      companyAddress: [null, Validators.required],
      vat: null,
      mensage: [null, Validators.required],
      website: [null, Validators.required],
      video: null
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .map(res => res)
      .subscribe(dados => {
        console.log(dados);
        console.log('cadastro com sucesso');
        this.form.reset();
      });

    this.router.navigate(['/register-challenge']);

    } else {
      console.log('formulario invalido');
      Object.keys(this.form.controls).forEach(field => {
        console.log(field);
        const control = this.form.get(field);
        control.markAsDirty();
      });
    }

  }

  verifyValidTouched(field) {
    return !this.form.get(field).valid && (this.form.get(field).touched || this.form.get(field).dirty);
  }

  applyCssError(field) {
    return {
      'has-error': this.verifyValidTouched(field),
      'has-feedback': this.verifyValidTouched(field)
    };
  }

  setDate(): void {
    const date = new Date();
    this.form.patchValue({dateincorporation: {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    }});
  }

  clearDate(): void {
    this.form.patchValue({myDate: null});
  }

  selectedChange(event: any) {
    this.selectedChallenge = event.target.value;
    console.log(this.selectedChallenge);
  }

  register() {

  }
}
