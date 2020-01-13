import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LibraryService} from '../service/library.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryOptionsResolver implements Resolve<Observable<any>> {
  constructor(private libraryService: LibraryService) {
  }

  resolve() {
    return this.libraryService.retrieveLibraryOptions();
  }
}
