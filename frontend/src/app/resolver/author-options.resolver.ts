import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LibraryService} from '../service/library.service';
import {AuthorService} from '../service/author.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorOptionsResolver implements Resolve<Observable<any>> {
  constructor(private authorService: AuthorService) {
  }

  resolve() {
    return this.authorService.retrieveAuthorOptions();
  }
}
