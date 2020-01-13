import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {LibraryService} from '../service/library.service';
import {AuthorService} from '../service/author.service';
import {BookService} from '../service/book.service';
import {LenderService} from '../service/lender.service';

@Injectable({
  providedIn: 'root'
})
export class LenderResolver implements Resolve<Observable<any>> {
  constructor(private lenderService: LenderService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.lenderService.getLender(route.paramMap.get('id'));
  }
}
