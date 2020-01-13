import {Component, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {Observable} from 'rxjs';
import {GenreService} from '../service/genre.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: any[];
  displayedColumns = ['title', 'genre', 'library_name', 'id'];

  constructor(private bookService: BookService, public genreService: GenreService, public userService: UserService) {
  }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((response: any[]) => {
        this.books = response;
      });
  }

  deleteBook(book: any) {
    this.bookService.deleteBook(book)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
