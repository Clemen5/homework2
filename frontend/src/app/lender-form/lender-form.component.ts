import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GenreService} from '../service/genre.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../service/user.service';
import {LenderService} from '../service/lender.service';

@Component({
  selector: 'app-lender-form',
  templateUrl: './lender-form.component.html',
  styleUrls: ['./lender-form.component.scss']
})
export class LenderFormComponent implements OnInit {

  lenderFormGroup;
  age;
  libraryOptions;
  authorOptions;

  constructor(private fb: FormBuilder, private lenderService: LenderService, private route: ActivatedRoute,
              private router: Router, public genreService: GenreService, private userService: UserService) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.libraryOptions = data.libraryOptions;
    this.authorOptions = data.authorOptions;


    this.lenderFormGroup = this.fb.group({
      id: [null],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      lending_date: [null, [Validators.required]],
      year_of_birth: [1999, [Validators.max(2020)]],
    });

    this.lenderFormGroup.controls.lending_date.valueChanges.subscribe(() => {
      const lendingDate = this.lenderFormGroup.controls.lending_date.value;
      this.age = undefined;
      if (lendingDate) {
        this.age = this.calculateAge(new Date(lendingDate));
      }
    });

    if (data.lender) {
      this.lenderFormGroup.patchValue(data.lender);
    }
  }

  calculateAge(date) {
    let ageDifMs = Date.now() - date;
    if (ageDifMs > 0) {
      let ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return 0;
    }
  }

  createLender() {
    const lender = this.lenderFormGroup.value;
    if (lender.id) {
      this.lenderService.updateLender(lender)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.lenderService.createLender(lender)
        .subscribe((response: any) => {
          this.router.navigate(['/lender-form/' + response.id]);
        });
    }
  }

  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /bad word/.test(control.value);
      return forbidden ? {badWord: {value: control.value}} : null;
    };
  }

  lenderNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.lenderService.getLenders()
        .pipe(
          map((lenders: any[]) => {
            const currentId = this.lenderFormGroup.controls.id.value;
            const currentFirstName = this.lenderFormGroup.controls.first_name.value;
            const currentLastName = this.lenderFormGroup.controls.last_name.value;

            const lenderWithSameName = lenders.find((m) => {
              return (currentId || m.id !== currentId) && m.first_name === currentFirstName && m.last_name === currentLastName;
            });
            if (lenderWithSameName) {
              return {
                nameAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    };
  }

}
