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
import {BookService} from '../service/book.service';
import {GenreService} from '../service/genre.service';
import {LibraryService} from '../service/library.service';
import {AuthorService} from '../service/author.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookFormGroup;
  age;
  libraryOptions;
  authorOptions;
  lenderOptions;

  constructor(private fb: FormBuilder, private bookService: BookService, private route: ActivatedRoute,
              private router: Router, public genreService: GenreService, private userService: UserService) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.libraryOptions = data.libraryOptions;
    this.authorOptions = data.authorOptions;
    this.lenderOptions = data.lenderOptions;


    this.bookFormGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      genre: [null],
      release_date: [null, [Validators.required]],
      plot: ['', [Validators.required, this.badWordValidator()]],
      pages: [90, [Validators.max(1000)]],
      e_book: [false],
      authors: [[]],
      library: [null],
      lender: [null]
    });

    this.bookFormGroup.controls.release_date.valueChanges.subscribe(() => {
      const releaseDate = this.bookFormGroup.controls.release_date.value;
      this.age = undefined;
      if (releaseDate) {
        this.age = this.calculateAge(new Date(releaseDate));
      }
    });

    if (data.book) {
      this.bookFormGroup.patchValue(data.book);
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

  createBook() {
    const book = this.bookFormGroup.value;
    if (book.id) {
      this.bookService.updateBook(book)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.bookService.createBook(book)
        .subscribe((response: any) => {
          this.router.navigate(['/book-form/' + response.id]);
        });
    }
  }

  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /bad word/.test(control.value);
      return forbidden ? {badWord: {value: control.value}} : null;
    };
  }

  titleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.bookService.getBooks()
        .pipe(
          map((books: any[]) => {
            const currentId = this.bookFormGroup.controls.id.value;
            const currentTitle = this.bookFormGroup.controls.title.value;
            const bookWithSameTitle = books.find((m) => {
              return (currentId || m.id !== currentId) && m.title === currentTitle;
            });
            if (bookWithSameTitle) {
              return {
                titleAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    };
  }

}
