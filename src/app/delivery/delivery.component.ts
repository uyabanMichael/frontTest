import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { DepartmentService } from './../services/citiesService';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit {
  addressForm: FormGroup;
  departments: any[] = [];

  constructor(private fb: FormBuilder, private departamentService : DepartmentService){
    this.addressForm = this.fb.group({
      ciudad: ['', Validators.required],
      direccion: ['', [Validators.required, this.addressValidator()]]
    });
  }

addressValidator(): ValidatorFn {
  const patterns: RegExp[] = [
    /^Calle \d+ [A-Z] (sur|norte|este|oeste)? # \d+ [A-Z]? \d+$/,
    /^^Calle \d+ #\d+(-\d+)?$/,
    /^^Carrera \d+ #\d+(-\d+)?$/,
    /^Avenida \w+(\s\w+)* #\s\d+[A-Z]?\s-\s\d+$/,
    /^TRANSVERSAL \d+ [A-Z] (BIS)? # \d+ [A-Z]? \d+ (SUR|NORTE|ESTE|OESTE)?$/,
    /^Circular \d+ # \d+[A-Z]? \d+$/,
    /^Diagonal \d+ # \d+ \d+$/,
    /^Avenida \d+(\s\w+)? # \d+(NORTE|SUR|ESTE|OESTE)? - \d+$/,
    /^Avenida \d+(\s\w+)? # \d+[a-zA-Z]? -\d+\sInterior \d+$/,
    /^Calle \d+ #\d+-\d+ Torre \d+ Apartamento \d+$/,
  ];
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = patterns.some(pattern => pattern.test(control.value));
      return valid ? null : { invalidNombreUsuario: true };
    };
  }

ngOnInit(): void {
  this.departamentService.getDepartments().subscribe(departments =>{
    this.departments=departments;
  })
}

onSubmit() {
    if (this.addressForm.valid) {
      console.log('Formulario válido', this.addressForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
