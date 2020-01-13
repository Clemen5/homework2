import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getBooks() {
    return this.http.get('/api/book/list');
  }

  createBook(book) {
    return this.http.post('/api/book/create', book);
  }

  updateBook(book) {
    return this.http.put('/api/book/' + book.id + '/update', book);
  }

  getBook(id) {
    return this.http.get('/api/book/' + id + '/get');
  }

  deleteBook(book) {
    return this.http.delete('/api/book/' + book.id + '/delete');
  }
}
