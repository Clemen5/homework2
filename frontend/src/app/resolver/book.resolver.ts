import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LibraryService} from '../service/library.service';
import {AuthorService} from '../service/author.service';
import {BookService} from '../service/book.service';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Observable<any>> {
  constructor(private bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.bookService.getBook(route.paramMap.get('id'));
  }
}
