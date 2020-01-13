import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LibraryService} from '../service/library.service';
import {AuthorService} from '../service/author.service';
import {LenderService} from '../service/lender.service';

@Injectable({
  providedIn: 'root'
})
export class LenderOptionsResolver implements Resolve<Observable<any>> {
  constructor(private lenderService: LenderService) {
  }

  resolve() {
    return this.lenderService.retrieveLenderOptions();
  }
}
