import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genreNames = {
    a: 'Adventure',
    b: 'Biography',
    c: 'Crime',
    f: 'Fiction'
  };

  constructor() { }
}
